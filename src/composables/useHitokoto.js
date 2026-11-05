import { ref } from 'vue'

/** 一言 API 请求组合式函数（含 1 秒冷却防抖） */
export function useHitokoto() {
  const text = ref('一个不正经的Up')
  const from = ref('Alec')
  const cooldown = ref(false)

  async function fetchHitokoto() {
    if (cooldown.value) return
    cooldown.value = true
    try {
      const res = await fetch('https://v1.hitokoto.cn?max_length=24')
      const { hitokoto, from: source } = await res.json()
      text.value = hitokoto
      from.value = source
    } catch { /* 保持现有文案 */ }
    setTimeout(() => { cooldown.value = false }, 1000)
  }

  return { text, from, cooldown, fetchHitokoto }
}
