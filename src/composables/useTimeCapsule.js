import { ref, onUnmounted } from 'vue'

/** 时间胶囊：展示日/周/月/年的进度百分比（每秒更新） */
export function useTimeCapsule() {
  const dayProgress = ref({ current: 0, percent: 0 })
  const weekProgress = ref({ current: 0, percent: 0 })
  const monthProgress = ref({ current: 0, percent: 0 })
  const yearProgress = ref({ current: 0, percent: 0 })

  let timer = null

  function update() {
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()

    // 今日进度
    const todayPass = (Date.now() - todayStart) / 1000 / 60 / 60
    dayProgress.value = { current: ~~todayPass, percent: ~~((todayPass / 24) * 100) }

    // 本周进度
    const weekDay = now.getDay() || 7
    weekProgress.value = { current: weekDay, percent: ~~((weekDay / 7) * 100) }

    // 本月进度
    const date = now.getDate()
    const monthAll = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
    monthProgress.value = { current: date, percent: ~~((date / monthAll) * 100) }

    // 本年进度
    const month = now.getMonth() + 1
    yearProgress.value = { current: month, percent: ~~((month / 12) * 100) }

    timer = setTimeout(update, 1000)
  }

  update()
  onUnmounted(() => clearTimeout(timer))

  return { dayProgress, weekProgress, monthProgress, yearProgress }
}
