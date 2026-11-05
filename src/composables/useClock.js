import { ref, onUnmounted } from 'vue'

/** 每秒更新当前时间的组合式函数 */
export function useClock() {
  const now = ref(new Date())
  let timer = null

  function tick() {
    now.value = new Date()
    timer = setTimeout(tick, 1000)
  }

  tick()
  onUnmounted(() => clearTimeout(timer))

  return { now }
}
