# TeamSpeak 自助频道管理系统

一个完整的 TeamSpeak 服务器自助频道管理解决方案，允许用户通过网页自动创建和管理私人语音频道。

## 📁 项目结构

```
teamspeakk/
├── index.html              # 前端页面
├── css/
│   └── ts-channel.css      # 页面样式（与主页风格一致）
├── js/
│   └── ts-channel.js       # 前端逻辑和 API 调用
├── server/
│   ├── server.js           # 后端 API 服务器
│   ├── .env.example        # 环境变量示例
│   └── package.json        # Node.js 依赖配置
└── README.md               # 本文件
```

## 🚀 快速开始

### 前提条件

- **Node.js** 12.0+ 或更高版本
- **npm** 或 **yarn**
- 已配置的 **TeamSpeak 3 服务器**
- TeamSpeak **Query Admin** 账户信息

### 1. 安装依赖

进入 `server/` 目录，安装后端依赖：

```bash
cd teamspeakk/server
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env`，填入你的 TeamSpeak 服务器信息：

```bash
cp .env.example .env
```

编辑 `.env` 文件，配置以下信息：

```env
PORT=3001
TS_HOST=你的TS服务器地址
TS_QUERY_PORT=10011
TS_USERNAME=serveradmin
TS_PASSWORD=你的Query管理员密码
TS_NICKNAME=频道机器人昵称
TS_SERVER_PORT=9987
NODE_ENV=development
```

### 3. 启动后端服务

```bash
npm start
```

服务器将在 `http://127.0.0.1:3001` 启动

### 4. 前端访问

打开浏览器访问前端页面：

```
http://127.0.0.1:8000/teamspeakk/
```

（假设你用 Python 简单服务器在 8000 端口以提供静态文件。参见主页的 `serve.bat` 或 `serve.ps1`）

## 🎯 功能特性

✅ **自助创建频道** - 用户通过表单自动创建私人语音频道
✅ **频道管理** - 查看、设置密码、删除自己的频道
✅ **样式统一** - 与主页使用相同的设计风格和配色
✅ **响应式设计** - 支持桌面和移动设备
✅ **错误处理** - 完整的异常捕获和友好的错误提示
✅ **连接重试** - 后端自动重连 TeamSpeak 服务

## 📋 API 端点

### 创建频道
**POST** `/api/channels/create`

请求体：
```json
{
  "name": "频道名称",
  "password": "可选密码",
  "maxUsers": 10,
  "description": "频道描述"
}
```

### 获取频道列表
**GET** `/api/channels/list`

响应：
```json
{
  "success": true,
  "channels": [
    {
      "cid": 123,
      "name": "我的频道",
      "description": "描述",
      "maxClients": 10,
      "currentClients": 2,
      "password": true,
      "isPermanent": false
    }
  ]
}
```

### 删除频道
**DELETE** `/api/channels/:cid`

### 获取频道详情
**GET** `/api/channels/:cid`

### 健康检查
**GET** `/api/health`

## 🔐 安全说明

- ⚠️ **不要将 `.env` 文件上传到公开仓库**
- 🔒 确保 Query Admin 账户权限设置正确
- 🛡️ 在生产环境使用 HTTPS
- 📝 考虑添加速率限制和用户认证

## 🛠️ 开发

### 修改样式

编辑 `css/ts-channel.css` 来自定义页面外观

### 修改前端逻辑

编辑 `js/ts-channel.js` 来扩展功能

### 修改后端 API

编辑 `server/server.js` 来添加新的 API 端点

## 📚 依赖包

- **express** - Web 框架
- **cors** - 跨域资源共享
- **ts3-nodejs-library** - TeamSpeak 3 Node.js 库
- **dotenv** - 环境变量管理

## 🐛 常见问题

### 连接失败 "Query admin 账户"

检查确保：
1. TeamSpeak 服务器已启动
2. Query 端口（默认 10011）已开放
3. 账户信息正确
4. 防火墙未阻止连接

### API 请求返回 404

确保后端服务正在运行，并且前端页面中的 `API_BASE` 配置正确指向后端服务地址

### 样式未正确加载

检查 CSS 文件路径是否正确，确保相对路径匹配

## 📖 更多帮助

如有问题，请在主页联系反馈。

---

**版本**: 1.0.0  
**最后更新**: 2026 年 2 月 26 日
