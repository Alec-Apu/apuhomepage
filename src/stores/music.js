import { defineStore } from 'pinia'
import { ref } from 'vue'
import APlayer from 'aplayer'

export const useMusicStore = defineStore('music', () => {
  const ap = ref(null)
  const isPlaying = ref(false)
  const currentTitle = ref('未播放音乐')
  const hasError = ref(false)
  const volume = ref(0.1)
  const wantAutoplay = ref(false)

  let lyricsTimer = null

  /** 标记需要自动播放（在用户点击"进入主页"时携带手势） */
  function markAutoplay() { wantAutoplay.value = true }

  /** 初始化 APlayer 播放器 */
  async function initPlayer(container) {
    if (!container) throw new Error('No container')

    const SERVER = 'tencent'
    const TYPE = 'playlist'
    const ID = '4756780495'

    try {
      const res = await fetch(`/meting/?server=${SERVER}&type=${TYPE}&id=${ID}`)
      const data = await res.json()

      const player = new APlayer({
        container,
        order: 'list',
        autoplay: false,
        preload: 'auto',
        listMaxHeight: '336px',
        volume: volume.value,
        mutex: true,
        lrcType: 3,
        audio: data,
      })

      ap.value = player
      window.ap = player

      // 播放事件 → 更新标题
      player.on('play', () => {
        isPlaying.value = true
        const title = document.querySelector('.aplayer-title')?.textContent ?? ''
        const author = document.querySelector('.aplayer-author')?.textContent ?? ''
        currentTitle.value = title + author
      })

      // 暂停事件
      player.on('pause', () => { isPlaying.value = false })

      // 歌词同步定时器
      clearInterval(lyricsTimer)
      lyricsTimer = setInterval(() => {
        const text = document.querySelector('.aplayer-lrc-current')?.textContent
        if (text) {
          const lrcBox = document.getElementById('lrc')
          if (lrcBox) lrcBox.textContent = text
        }
      }, 500)

      // 自动播放（利用"进入主页"按钮的手势）
      if (wantAutoplay.value) setTimeout(() => player.play(), 300)

      return player
    } catch (err) {
      hasError.value = true
      throw err
    }
  }

  /** 切换播放/暂停 */
  function toggle() { ap.value?.toggle() }
  /** 下一曲 */
  function next() { ap.value?.skipForward(); ap.value?.play() }
  /** 上一曲 */
  function prev() { ap.value?.skipBack(); ap.value?.play() }
  /** 设置音量 */
  function setVolume(v) { volume.value = v; ap.value?.volume(v, true) }
  /** 销毁播放器 */
  function destroy() {
    clearInterval(lyricsTimer)
    ap.value?.destroy()
    ap.value = null
  }

  return {
    ap, isPlaying, currentTitle, hasError, volume, wantAutoplay,
    initPlayer, markAutoplay, toggle, next, prev, setVolume, destroy,
  }
})
