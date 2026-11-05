import { ref, onMounted, onUnmounted } from 'vue'

/** 追踪鼠标坐标的组合式函数（使用 RAF 优化性能） */
export function useCursor() {
  const x = ref(0)
  const y = ref(0)

  function onMouseMove({ clientX, clientY }) {
    requestAnimationFrame(() => {
      x.value = clientX
      y.value = clientY
    })
  }

  onMounted(() => document.addEventListener('mousemove', onMouseMove))
  onUnmounted(() => document.removeEventListener('mousemove', onMouseMove))

  return { x, y }
}
