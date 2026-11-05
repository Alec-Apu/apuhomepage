# 更新日志

## v6.5.25 (2026-05-25)

- 敏感信息整改：AMAP_KEY / METING_API_BASE 迁移至 `.env`，不入库
- 天气模块修复：IPv6 兼容，双 fallback 获取 IPv4 后调高德 API
- 新增 `.env.example` 环境变量模板，`.gitignore` 全面加固
- 更新架构文档

## v6.5.23 (2026-05-23) — Alpha on Vue!

- 项目整体迁移至 Vue 3 + Pinia 架构
- 全站 src 代码重构：ES6+ 语法糖、中文注释全覆盖
- 壁纸模块支持默认/每日一图/随机风景/随机动漫四种模式
- 时间胶囊：日/周/月/年进度实时展示
- 一言卡片集成（hitokoto API）
- 天气模块通过高德 API 实时获取
- 音乐播放器集成 APlayer + Meting
- 移动端适配（底部导航栏、响应式布局）
- 纪念日灰度滤镜
- 自定义鼠标指针
- Toast 通知系统
