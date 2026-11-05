
<p>
<strong><h2>Alec 的个人主页</h2></strong>
简单的小主页，基于imsyy/home，全新升级。
</p>

![Alec 的个人主页](/screenshots/main.png)



### 👀 Demo

> 由于 CDN 缓存原因，查看最新效果可能需要 `Ctrl` + `F5` 强制刷新浏览器缓存

- [Alec 的个人主页](https://alecapu.com)

### 🎉 功能

- [x] 站点简介
- [x] Hitokoto 一言
- [x] 日期及时间
- [x] 实时天气
- [x] 时光进度条
- [x] 音乐播放器
- [x] 移动端适配


### ⚙️ 手动部署

- **安装** [node.js](https://nodejs.org/zh-cn/) **环境**


- 然后以 **管理员权限** 运行 `cmd` 终端，并 `cd` 到 项目根目录
- 在 `终端` 中输入：

```bash
# 安装依赖
npm install

# 预览
npm run dev

# 构建
npm run build

# 启动
npm start
```

> 构建完成后，静态资源会在 **`dist` 目录** 中生成，可将 **`dist` 文件夹下的文件**上传至服务器，也可使用 `Vercel` 等托管平台一键导入并自动部署




### 天气

天气及地区获取需要 `高德开放平台` 相关 API

- 前往 [高德开放平台控制台](https://console.amap.com/dev/index) 创建一个 `Web 服务` 类型的 `Key`，并将 `Key` 填入 `.env` 中的 `VITE_AMAP_KEY` 中

也可自行更换其他方式

### 音乐

> 本项目采用了基于 `MetingJS` 的 `Aplayer` 音乐播放器，可实现快速自定义歌单  
> \*仅支持 **中国大陆地区**




## 个性化配置

名称：Alec；域名：alecapu.com。社交与导航链接配置位于 src/utils/constants.js。保留原歌单和音乐代理接口；友情链接由站主指定。
