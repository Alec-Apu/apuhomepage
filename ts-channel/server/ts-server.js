// ts-server.js - TeamSpeak 频道管理后端
// 使用 npm install express cors ts3-nodejs-library dotenv 安装依赖

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { TeamSpeakClient } = require('ts3-nodejs-library');

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// TeamSpeak 配置 - 从环境变量读取
const TS_CONFIG = {
    host: process.env.TS_HOST || 'alecapu.top',
    queryPort: parseInt(process.env.TS_QUERY_PORT || '10011'),
    username: process.env.TS_USERNAME || '',
    password: process.env.TS_PASSWORD || '',
    nickname: process.env.TS_NICKNAME || 'ChannelBot',
    serverPort: parseInt(process.env.TS_SERVER_PORT || '9987'),
};

// TS3 客户端单例
let tsClient = null;

// 初始化 TS3 连接
async function initTeamSpeak() {
    try {
        tsClient = new TeamSpeakClient(TS_CONFIG);
        await tsClient.connect();
        console.log('[TS3] 已连接到 TeamSpeak 服务器');
        
        // 选择虚拟服务器
        await tsClient.selectVirtualServer(TS_CONFIG.serverPort);
        console.log('[TS3] 已选择虚拟服务器');
        
        return true;
    } catch (error) {
        console.error('[TS3] 连接失败:', error.message);
        return false;
    }
}

// 重新连接 TS3
async function reconnectTeamSpeak() {
    try {
        if (tsClient) {
            await tsClient.close();
        }
        return await initTeamSpeak();
    } catch (error) {
        console.error('[TS3] 重新连接失败:', error);
        return false;
    }
}

// 获取 TS3 客户端
async function getTeamSpeakClient() {
    if (!tsClient) {
        const connected = await initTeamSpeak();
        if (!connected) throw new Error('TS3 连接失败');
    }
    return tsClient;
}

// ============== API 路由 ==============

// 健康检查
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 创建频道
app.post('/api/channels/create', async (req, res) => {
    try {
        const { name, password, maxUsers, description } = req.body;

        // 验证输入
        if (!name || name.length > 40) {
            return res.status(400).json({ message: '频道名称不合法' });
        }

        if (maxUsers < 1 || maxUsers > 100) {
            return res.status(400).json({ message: '最大用户数必须在 1 到 100 之间' });
        }

        const client = await getTeamSpeakClient();

        // 创建频道参数
        const channelData = {
            channelName: name,
            channelTopic: description || '',
            channelMaxclients: maxUsers,
            channelFlagDefault: false,
            channelFlagSemiPermanent: true, // 半永久频道
            channelFlagPermanent: false,
        };

        // 如果有密码，添加密码
        if (password) {
            channelData.channelPassword = password;
        }

        // 创建频道
        const newChannel = await client.channelCreate(channelData);

        res.json({
            success: true,
            message: '频道创建成功',
            channelId: newChannel.cid,
            channelName: name,
        });

    } catch (error) {
        console.error('创建频道出错:', error.message);
        
        // 尝试重新连接
        if (error.message.includes('connection')) {
            await reconnectTeamSpeak();
        }

        res.status(500).json({
            message: '创建失败: ' + error.message,
        });
    }
});

// 获取频道列表
app.get('/api/channels/list', async (req, res) => {
    try {
        const client = await getTeamSpeakClient();

        // 获取所有频道
        const channels = await client.channelList();

        // 过滤并格式化频道数据
        const formattedChannels = channels
            .filter(ch => !ch.isDefault && !ch.isSpacial) // 排除默认频道和特殊频道
            .map(ch => ({
                cid: ch.cid,
                name: ch.name,
                description: ch.topic || '',
                maxClients: ch.maxClients,
                currentClients: ch.totalClients || 0,
                password: !!ch.password,
                isPermanent: ch.isPermanent,
            }));

        res.json({
            success: true,
            channels: formattedChannels,
        });

    } catch (error) {
        console.error('获取频道列表出错:', error.message);
        
        if (error.message.includes('connection')) {
            await reconnectTeamSpeak();
        }

        res.status(500).json({
            message: '获取列表失败: ' + error.message,
        });
    }
});

// 删除频道
app.delete('/api/channels/:cid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);

        if (!Number.isInteger(cid) || cid < 1) {
            return res.status(400).json({ message: '无效的频道 ID' });
        }

        const client = await getTeamSpeakClient();

        // 删除频道
        await client.channelDelete(cid);

        res.json({
            success: true,
            message: '频道已删除',
        });

    } catch (error) {
        console.error('删除频道出错:', error.message);
        
        if (error.message.includes('connection')) {
            await reconnectTeamSpeak();
        }

        res.status(500).json({
            message: '删除失败: ' + error.message,
        });
    }
});

// 获取频道详情
app.get('/api/channels/:cid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);

        if (!Number.isInteger(cid)) {
            return res.status(400).json({ message: '无效的频道 ID' });
        }

        const client = await getTeamSpeakClient();
        const channel = await client.getChannelById(cid);

        if (!channel) {
            return res.status(404).json({ message: '频道不存在' });
        }

        res.json({
            success: true,
            channel: {
                cid: channel.cid,
                name: channel.name,
                description: channel.topic || '',
                maxClients: channel.maxClients,
                currentClients: channel.totalClients || 0,
                password: !!channel.password,
                isPermanent: channel.isPermanent,
            },
        });

    } catch (error) {
        console.error('获取频道详情出错:', error.message);
        res.status(500).json({ message: '获取失败: ' + error.message });
    }
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error('未处理的错误:', err);
    res.status(500).json({
        message: '服务器错误',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
});

// 启动服务器
app.listen(PORT, async () => {
    console.log(`[服务器] 启动在 http://127.0.0.1:${PORT}`);
    
    // 尝试连接 TS3
    const connected = await initTeamSpeak();
    if (!connected) {
        console.warn('[警告] TS3 连接失败，请检查配置');
    }
});

// 优雅关闭
process.on('SIGTERM', async () => {
    console.log('[服务器] 正在关闭...');
    if (tsClient) {
        await tsClient.close();
    }
    process.exit(0);
});
