# nsvNEWweb-vue 项目架构

原项目为静态 HTML 页面（`nsvNEWweb - 20260510 +ipv6`），迁移至 Vue 3 + Vite + Express 架构运行。

## 技术栈

| 层 | 技术 |
|---|---|
| 前端框架 | Vue 3 (Composition API + `<script setup>`) |
| 状态管理 | Pinia |
| 构建工具 | Vite 8 |
| 后端 | Express 5（仅本地回环，生产环境由反向代理对外） |
| 环境变量 | Vite `import.meta.env` + `.env` 文件 |
| CSS | 原项目 style.css + Bootstrap 5.3（仅栅格） |
| 音乐播放 | APlayer (npm) |
| 图标 | Font Awesome 7 (CDN) |
| Cookie | universal-cookie (主站) + js.cookie.js (子页面) |

## 目录结构

```
nsvNEWweb-vue/
├── index.html              # SPA 入口，引入 Bootstrap / HarmonyOS 字体 / APlayer CSS
├── vite.config.js          # Vite 配置（PWA、别名 @/）
├── server.js               # Express 后端（Meting API 代理 + 静态子页面）
├── .env                    # 环境变量（VITE_AMAP_KEY，gitignored）
├── .env.example            # 环境变量模板
├── public/                 # 静态资源（直接映射到根路径）
│   ├── cdn/                # Bootstrap、APlayer 等第三方库
│   ├── font/               # 自定义字体（Pacifico、UnidreamLED）
│   ├── img/                # 图片资源（壁纸、图标、favicon）
│   ├── js/                 # 子页面共享脚本
│   │   ├── js.cookie.js    # Cookie 操作库
│   │   └── set.js          # 壁纸偏好读取（子页面读取 bg_img cookie）
│   ├── I2B/                # 点阵图转换器（静态子页面）
│   ├── ts-guide/           # TeamSpeak 教程（静态子页面）
│   ├── UnlockMusic/        # 音乐解锁工具（静态子页面）
│   ├── I2B-old/            # 旧版点阵图转换器
│   └── upgrade-your-browser/ # 浏览器升级提示
└── src/
    ├── main.js             # Vue 应用入口，挂载 Pinia + 全局 CSS
    ├── App.vue             # 根组件（纪念日、问候语、console 品牌信息）
    ├── assets/styles/      # 全局样式（从原项目 CSS 迁移）
    │   ├── style.css       # 主样式（玻璃拟态卡片、布局、Aplayer 覆盖）
    │   ├── mobile.css      # 响应式（≤768px 移动端、平板、横屏、安全区）
    │   ├── first-screen.css # 第一屏（进入按钮）
    │   ├── loading.css     # 加载动画（旋转 spinner）
    │   └── animations.css  # 关键帧（淡入、旋转、导航滑入）
    ├── components/         # Vue 组件
    │   ├── AppEntry.vue    # 应用入口编排：第一屏 → 加载 → 主页（含 AudioContext 解锁）
    │   ├── FirstScreen.vue # "点击进入" 首屏
    │   ├── LoadingScreen.vue # 加载过渡（等待背景图加载完成即进入）
    │   ├── BackgroundLayer.vue # 全屏背景图 + 暗色遮罩
    │   ├── CustomCursor.vue # 自定义圆形光标
    │   ├── MainLayout.vue  # 主布局容器（container > row > left/right + MorePanel + SettingsModal）
    │   ├── LeftPanel.vue   # 左栏：头像、简介、社交链接
    │   ├── AvatarLogo.vue  # 旋转头像（Android 自动降级 PNG，其他平台 AVIF）
    │   ├── IntroCard.vue   # 简介卡片（点击切换更多面板）
    │   ├── SocialLinks.vue # 社交链接（纯图标，无悬停交互）
    │   ├── RightPanel.vue  # 右栏：一言/音乐、时间、链接卡片
    │   ├── HitokotoCard.vue # 一言卡片（v-show 控制显隐，点击刷新）
    │   ├── MusicPlayerCard.vue # 音乐控制卡片（播放/上下曲/音量滑块）
    │   ├── TimeCard.vue    # 时间日期 + 天气（点击刷新天气）
    │   ├── LinkCards.vue   # 6 个快捷链接（音乐解锁/TS指南/换肤等）
    │   ├── MorePanel.vue   # 侧边更多面板（时间胶囊 + 杂项链接）
    │   ├── SettingsModal.vue # 音乐播放器全屏弹窗（打开时隐藏主页内容）
    │   ├── WallpaperSettings.vue # 壁纸切换（默认/每日/风景/动漫）
    │   ├── FullPlayer.vue  # APlayer 完整播放器容器
    │   ├── MobileNavBar.vue # 移动端底部导航（精简动画，零开销）
    │   ├── FooterBar.vue   # 底部版权 + 运行时间 / 播放歌词切换
    │   └── ToastContainer.vue # 轻量 Toast 通知（替代 iziToast）
    ├── stores/             # Pinia 状态管理
    │   ├── app.js          # 应用状态（进入/加载/纪念日/运行时间）
    │   ├── ui.js           # UI 状态（面板开关/音乐切换/移动端检测）
    │   ├── music.js        # APlayer 实例管理（自动播放/歌词同步）
    │   ├── wallpaper.js    # 壁纸类型 + 来源管理（cookie 持久化，365 天）
    │   └── weather.js      # 天气数据（IPv4 检测 + Amap API）
    ├── composables/        # 组合式函数
    │   ├── useClock.js     # 实时时钟
    │   ├── useCursor.js    # 光标位置追踪
    │   ├── useHitokoto.js  # 一言 API 请求
    │   ├── useRuntimeCounter.js # 站点运行时间计数器
    │   ├── useTimeCapsule.js # 时间胶囊（日月年进度）
    │   └── useToast.js     # Toast 通知管理（replace 模式）
    └── utils/
        └── constants.js    # 常量（星期映射等）
```

## 数据流

### 页面生命周期
```
App.vue (mounted)
  → initGreeting() / checkMemorialDay()
  → AppEntry.vue 渲染
    → FirstScreen（点击"进入" → AudioContext 解锁音频 + markAutoplay）
    → LoadingScreen（等待背景图 onload，不再硬编码延时）
    → 主页（BackgroundLayer + section 直接显示，无入场动画）
```

### 音乐播放链路
```
FirstScreen "进入主页"
  → AudioContext.resume() 解锁音频（绕过 Chrome 自动播放限制）
  → musicStore.markAutoplay()

HitokotoCard "打开音乐播放器"
  → uiStore.switchToMusic()
  → HitokotoCard 隐藏，MusicPlayerCard 显示

MusicPlayerCard "音乐列表"
  → uiStore.openSettings()
  → 主页内容隐藏，SettingsModal 全屏显示
  → FullPlayer 挂载 → musicStore.initPlayer(container)
  → fetch /meting/ → server.js → kennyz.cn:11444/meting/
  → APlayer 初始化 → 检测 wantAutoplay → player.play()

播放时 Footer 自动切换为歌词显示（500ms 轮询 .aplayer-lrc-current）
```

### Meting API 链路
```
前端: /meting/?server=tencent&type=playlist&id=xxx
  → server.js Express 路由
  → 外部 API: https://kennyz.cn:11444/meting/
  → 5 分钟内存缓存 → 返回 JSON → APlayer 渲染
```

### 天气数据链路
```
weather.js fetchWeather()
  → getIPv4() 获取客户端公网 IPv4
    → 主: api-ipv4.ip.sb/ip
    → 备: ipv4.icanhazip.com
    → 5s 超时自动 fallback
  → Amap IP API: restapi.amap.com/v3/ip?key=...&ip=...
    → 返回 adcode
  → Amap Weather API: restapi.amap.com/v3/weather/weatherInfo?key=...&city=...
    → 返回实时天气 JSON
```
> Key 通过 `import.meta.env.VITE_AMAP_KEY` 从 `.env` 注入，不入库。
> Amap 要求显式传 IPv4，直接走 IPv6 会返回空数组。

### 壁纸偏好共享
```
主站 (Vue):
  wallpaper.js → setType() → cookies.set('bg_img', {type}, 365d)
  wallpaper.js → loadFromCookies() → resolveCurrentSrc()

子页面 (static HTML):
  public/js/set.js → Cookies.get('bg_img') → JSON.parse → #bg.src
```

## 关键设计

- **CSS 兼容**: 保留原项目全部 CSS，Bootstrap 仅提供栅格和部分组件样式
- **v-show 显隐**: 所有面板切换使用 `v-show`（非 `v-if`），避免 DOM 重建
- **玻璃拟态**: 卡片统一使用 `border: 1px solid transparent` + `-webkit-backdrop-filter` + 渐变背景，Chrome/Firefox 双兼容
- **无入场动画**: section 直接 `opacity: 1; transform: scale(1)`，避免 Chrome backdrop-root 导致卡片模糊闪烁
- **子页面路由**: server.js 显式挂载各静态子目录，先于 SPA fallback 匹配
- **环境变量**: Key 通过 `.env`（gitignored）注入客户端，`.env.example` 作为模板提交
- **PWA**: vite-plugin-pwa 生成 Service Worker，支持离线缓存
- **头像降级**: Android UA 检测，自动使用 PNG (SDR) 替代 AVIF (HDR)，避免 GPU 兼容性闪屏
