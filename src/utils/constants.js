/** 社交链接配置 */
export const socialLinks = [
  { id: 'github', icon: 'fa-brands fa-github', url: 'https://github.com/Alec-Apu', hover: '去 Github 看看' },
  { id: 'qq', icon: 'fa-brands fa-qq', url: 'https://wpa.qq.com/msgrd?v=3&uin=3441257568&site=qq&menu=yes', hover: '有什么事吗' },
  { id: 'email', icon: 'fa-solid fa-envelope', url: 'mailto:3441257568@qq.com', hover: '来封 Email' },
  { id: 'bilibili', icon: 'fa-brands fa-bilibili', url: 'https://space.bilibili.com/1191224927', hover: '来 B 站看看 ~' },
  { id: 'telegram', icon: 'fa-brands fa-telegram', url: 'https://t.me/Alecapu1337', hover: '你懂的 ~' },
]

/** 链接卡片配置（双行布局） */
export const linkCards = [
  [
    { icon: 'fa-solid fa-music', name: '音乐解锁', url: '/UnlockMusic/' },
    { icon: 'fa-solid fa-cloud', name: 'TS指南', url: '/ts-guide/' },
    { icon: 'fa-solid fa-compass', name: '在线换肤 · 待开发', url: null },
  ],
  [
    { icon: 'fa-solid fa-compass', name: '点阵图转换', url: '/I2B/' },
    { icon: 'fa-solid fa-book-bookmark', name: 'MC皮肤站', url: 'https://apu.alecapu.com:10443' },
    { icon: 'fa-solid fa-flask', name: '直连TS', url: 'ts3server://alecapu.top?port=9987' },
  ],
]

/** 快捷链接配置（更多面板用） */
export const quickLinks = [
  [
    { name: '腾讯元宝', url: 'https://yuanbao.tencent.com/' },
    { name: 'Github', url: 'https://github.com/' },
    { name: 'MC皮肤站', url: 'https://apu.alecapu.com:10443' },
  ],
  [
    { name: 'DeepSeek', url: 'https://deepseek.com/' },
    { name: '友情链接', url: 'https://kennyz.cn:11444/' },
    { name: '更多', isAction: true },
  ],
]

/** 壁纸选项 */
export const wallpaperOptions = [
  { value: '1', label: '默认壁纸' },
  { value: '2', label: '每日一图' },
  { value: '3', label: '随机风景' },
  { value: '4', label: '随机动漫' },
]

/** 星期中文映射 */
export const WEEKDAYS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
