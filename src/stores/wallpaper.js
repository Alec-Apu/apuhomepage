import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

/** 壁纸类型 → API 地址映射 */
const WALLPAPER_API = {
  2: 'https://api.dujin.org/bing/1920.php',
  3: 'https://api.btstu.cn/sjbz/api.php?lx=fengjing&format=images',
  4: 'https://www.dmoe.cc/random.php',
}

/** 本地背景图数量 */
const LOCAL_BG_COUNT = 6

/** 根据类型构建壁纸 URL */
function buildSrc(type) {
  const apiUrl = WALLPAPER_API[type]
  return apiUrl
    ? `${apiUrl}${apiUrl.includes('?') ? '&' : '?'}_t=${Date.now()}`
    : `/img/alec-background${1 + ~~(Math.random() * LOCAL_BG_COUNT)}.jpg`
}

export const useWallpaperStore = defineStore('wallpaper', () => {
  const type = ref('1')
  const currentSrc = ref('')

  /** 预加载缓存：每个模式各存一份已加载的 URL */
  const preloaded = reactive({ 1: '', 2: '', 3: '', 4: '' })

  /** 是否为默认壁纸 */
  const isDefault = computed(() => type.value === '1')

  /** 并行预加载全部四个模式的壁纸到浏览器缓存 */
  function preloadAll() {
    for (const t of ['1', '2', '3', '4']) {
      const src = buildSrc(t)
      preloaded[t] = src
      new Image().src = src
    }
    currentSrc.value = preloaded[type.value]
  }

  function resolveCurrentSrc() {
    const src = buildSrc(type.value)
    preloaded[type.value] = src
    currentSrc.value = src
  }

  /** 从 Cookie 恢复壁纸设置后并行预加载全部壁纸 */
  function loadFromCookies() {
    try {
      const saved = cookies.get('bg_img')
      if (saved?.type) type.value = saved.type
    } catch { /* 使用默认壁纸 */ }
    preloadAll()
  }

  /** 切换壁纸类型并持久化到 Cookie（有效期一年）；优先用预加载缓存实现瞬间切换 */
  function setType(newType) {
    type.value = newType
    cookies.set('bg_img', { type: newType }, { maxAge: 365 * 24 * 60 * 60 })
    // 使用预加载 URL 达成瞬间切换
    if (preloaded[newType]) {
      currentSrc.value = preloaded[newType]
    }
    // 后台刷新该模式，下次切换时又是新的
    const fresh = buildSrc(newType)
    preloaded[newType] = fresh
    new Image().src = fresh
  }

  return { type, currentSrc, isDefault, preloadAll, resolveCurrentSrc, loadFromCookies, setType }
})
