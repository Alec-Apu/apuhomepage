# Alec-Apu 个人主页

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一个功能丰富、设计精美的个人主页，集合了音乐播放、动态背景、网站运行时统计、PWA 支持等多项功能。支持响应式设计，可完美适配桌面和移动设备。

## ✨ 核心功能

- 🎨 **动态背景** - 随机背景图自动切换
- 🎵 **音乐播放** - 集成 APlayer 音乐播放器（QQ 音乐、网易云等）
- ⏱️ **运行时统计** - 网站自动计算运行天数和时间
- 🌓 **欢迎动画** - 精美的首次访问欢迎界面
- 📱 **响应式设计** - 完美适配所有设备尺寸
- 🎯 **自定义指针** - 炫彩鼠标指针效果
- 💬 **一言集成** - 每日随机显示一句话
- 🔔 **实时通知** - iziToast 通知组件
- 🌐 **PWA 支持** - 可添加到主屏幕，离线访问
- 📊 **访问统计** - 集成 51.LA 统计系统

## 📁 项目结构

```
.
├── index.html                  # 主页面
├── css/                        # 样式文件
│   ├── style.css              # 主样式
│   ├── mobile.css             # 移动端样式
│   ├── animation.css          # 动画效果
│   ├── welcome.css            # 欢迎页样式
│   └── ...
├── js/                        # 脚本文件
│   ├── main.js                # 主逻辑
│   ├── music.js               # 音乐播放器配置
│   ├── time.js                # 运行时统计
│   ├── welcome.js             # 欢迎界面
│   └── ...
├── img/                       # 背景图和图标
├── font/                      # 字体文件
├── ts-channel/                # TeamSpeak 频道显示模块
├── teamspeakk/                # TeamSpeak 服务器信息显示
├── upgrade-your-browser/      # IE 不兼容提示页面
├── manifest.json              # PWA 配置
└── vercel.json                # Vercel 部署配置
```

## 🚀 快速开始

### 本地开发

1. **克隆项目**
```bash
git clone https://github.com/Alec-Apu/apupu.git
cd apupu
```

2. **启动本地服务器**
```bash
# Windows (PowerShell)
./serve.ps1

# Windows (Batch)
serve.bat

# 或直接打开 index.html
```

3. **访问主页**
在浏览器中打开 `http://localhost` 或直接打开 `index.html`

### 部署到 Vercel

1. Push 代码到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. Vercel 会自动根据 `vercel.json` 配置进行部署

## 🛠️ 配置说明

### 修改音乐播放列表

编辑 `js/music.js` 文件：

```javascript
let server = "tencent";      // 音乐平台 (tencent/netease/kugou)
let type = "playlist";        // 类型 (playlist/album/song)
let id = "你的歌单ID";        // 歌单/专辑/歌曲 ID
```

支持的音乐平台：
- `tencent` - QQ 音乐
- `netease` - 网易云音乐
- `kugou` - 酷狗音乐

### 添加背景图

1. 将图片放入 `img/` 文件夹
2. 在 `js/main.js` 中修改 `backgroundImages` 数组：

```javascript
const backgroundImages = [
  "./img/background1.png",
  "./img/background2.png",
  "./img/background3.png",
  "./img/你的图片.jpg"  // 添加新图片
];
```

### 修改个人信息

编辑 `index.html` 中的以下部分：
- `<title>` - 页面标题
- `<meta name="description">` - 页面描述
- `<meta name="keywords">` - 关键词
- 主页面内容区域

### 更改运行时统计起始日期

编辑 `js/time.js` 中的时间戳：

```javascript
const startDate = new Date("2021/5/20");  // 修改此日期
```

### 配置 TeamSpeak

如需启用 TeamSpeak 频道显示，编辑相应模块：
- `ts-channel/js/channel.js` - 频道配置
- `teamspeakk/js/ts-channel.js` - 服务器信息配置

## 📦 技术栈

**前端框架与库：**
- HTML5 / CSS3 / JavaScript (原生)
- jQuery 3.5.1
- Bootstrap 5

**UI 组件：**
- APlayer 1.10.1 - 音乐播放器
- iziToast 1.4.0 - 通知组件
- Font Awesome 6.1.2 - 图标库

**其他：**
- HarmonyOS Sans 字体 (B 站 CDN)
- PWA 支持
- Service Worker 缓存
- 51.LA 统计

## 💾 浏览器兼容性

- ✅ Chrome/Edge (推荐)
- ✅ Firefox
- ✅ Safari
- ❌ IE (会自动跳转到浏览器升级页面)

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 👨‍💻 作者

**Alec-Apu**

## 🌐 在线演示

https://apupu.top

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📝 更新日志

- **v1.0.0** - 初始版本发布，包含基础功能
