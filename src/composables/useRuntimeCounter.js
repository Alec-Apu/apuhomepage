import { ref, onUnmounted } from 'vue'

/** 时间常量（毫秒） */
const DAY = 24 * 60 * 60 * 1000
const HR = 60 * 60 * 1000
const MIN = 60 * 1000

/** 站点运行时长计数器（每秒更新） */
export function useRuntimeCounter() {
  const runtime = ref('')
  const start = new Date('08/24/2020 15:42:44')
  let timer = null

  function update() {
    const diff = Date.now() - start.getTime()
    runtime.value = `本站已运行：${~~(diff / DAY)}天${~~((diff % DAY) / HR)}小时${~~((diff % HR) / MIN)}分${~~((diff % MIN) / 1000)}秒`
    timer = setTimeout(update, 1000)
  }

  update()
  onUnmounted(() => clearTimeout(timer))

  return { runtime }
}
