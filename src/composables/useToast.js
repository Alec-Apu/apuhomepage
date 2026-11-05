import { ref, readonly } from 'vue'

/** 全局 Toast 通知管理（单例状态） */
const toasts = ref([])
let nextId = 1

export function useToast() {
  /**
   * 显示 Toast 通知
   * @param {Object} options
   * @param {string} options.icon - Font Awesome 图标类名
   * @param {string} options.message - 提示文案
   * @param {number} [options.timeout=3000] - 自动消失时间（毫秒）
   * @param {'replace'|'stack'} [options.displayMode='replace'] - replace=替换现有 / stack=叠加显示
   */
  function show({ icon, message, timeout = 3000, displayMode = 'replace' }) {
    if (displayMode === 'replace') toasts.value = []

    const id = nextId++
    toasts.value.push({ id, icon, message })
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, timeout)
  }

  return { toasts: readonly(toasts), show }
}
