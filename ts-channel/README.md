# TeamSpeak 频道管理系统

## 📁 文件结构

```
vercel.json/
├── index.html                    # 主页
├── css/
│   ├── style.css               # 主样式
│   ├── mobile.css              # 移动端样式
│   └── ...
├── js/
│   ├── main.js                 # 主脚本
│   ├── music.js                # 音乐功能
│   └── ...
└── ts-channel/                 # TeamSpeak 频道管理模块
    ├── index.html              # TS 频道管理页面
    ├── css/
    │   └── channel.css         # TS 页面样式
    ├── js/
    │   └── channel.js          # TS 页面脚本
    └── server/                 # 后端服务
        ├── ts-server.js        # Express 服务器
        ├── package.json        # NPM 依赖配置
        └── .env.example        # 环境变量示例
```

## 🚀 前端使用

### 访问地址
- 本地: `http://127.0.0.1:8000/ts-channel/`
- 线上: `https://alecapu.top/ts-channel/`

### 功能
1. **创建频道** - 输入频道信息（名称、密码、最大用户数、描述）
2. **管理频道** - 查看和删除已创建的频道
3. **使用说明** - 用户指导

## 🔧 后端配置

### 依赖安装

```bash
cd ts-channel/server
npm install
```

### 环境配置

1. 复制 `.env.example` 为 `.env`
2. 填入 TeamSpeak 服务器配置：

```env
# ====== TeamSpeak Query API 配置 ======
TS_HOST=alecapu.top            # TS 主机域名或 IP，可换成公网 IP
TS_QUERY_PORT=10011           # Query 服务端口
TS_USERNAME=api_user           # 最小权限专用 Query 帐号
TS_PASSWORD=lzrCWnsr           # 该帐号密码
TS_NICKNAME=ChannelBot        # Bot 登录后的名称，可变
TS_SERVER_PORT=9987           # 虚拟服务器端口

# ====== NodeJS 后端 ======
# 后端监听端口，可根据服务器配置修改。例如当前使用 13344
PORT=13344
```

> **使用专用 Query 账号**
> 
> 为了安全，请不要使用 `serveradmin` 等权限过大的账号。只需在 TS 服务器上创建 **一个专用 ServerQuery 帐号**，授予创建永久频道及子频道的最小权限即可。
> 上述示例中的 `api_user` / `lzrCWnsr` 只是占位，部署时由管理员创建的凭据应写入 `.env`。
> 
> 如果要创建或查看 Query 帐号，可用如下 ServerQuery 命令：
> ```text
> clientcreate client_login_name=api_user client_login_password=lzrCWnsr
> ```
> 同时，将该用户加入权限组（如 sgid=15），使其具有频道创建权限。不要赋予删除频道、踢人、管理用户等多余权限。
> 
> 该 `.env` 文件应仅保存在后端服务器，且务必加入 `.gitignore`。



### 启动服务器

```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

服务器将运行在 `http://127.0.0.1:13344`

## 📡 API 端点

| 方法 | 端点 | 说明 |
|------|------|------|
| GET | `/api/health` | 健康检查 |
| POST | `/api/channels/create` | 创建频道 |
| GET | `/api/channels/list` | 获取频道列表 |
| GET | `/api/channels/:cid` | 获取频道详情 |
| DELETE | `/api/channels/:cid` | 删除频道 |

## 💡 样式说明

TS 频道管理页面的样式与主页保持一致：
- 使用同样的渐变背景
- 采用玻璃态卡片设计
- 响应式布局
- HarmonyOS 字体

## 🔐 安全提示

1. 不要将 `.env` 文件上传到 Git
2. 确保 TS Query 账号权限受限
3. 在生产环境使用 HTTPS
4. 定期更新依赖包

## 📝 开发说明

前端文件修改后，无需重启服务器。
后端文件修改后，使用 `npm run dev` 自动重启。

## 🐛 常见问题

### 后端连接失败
- 检查 TS 服务器是否在线
- 验证 Query 账号和密码
- 检查防火墙端口开放

### 前端无法访问 API
- 确保后端服务已启动
- 检查 CORS 配置
- 查看浏览器控制台错误信息
