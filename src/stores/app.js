import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/** 纪念日列表（月/日） */
const MEMORIAL_DAYS = [
  { m: 4, d: 4 },
  { m: 5, d: 12 },
  { m: 7, d: 7 },
  { m: 9, d: 9 },
  { m: 9, d: 18 },
  { m: 12, d: 13 },
]

/** 时段问候语映射 */
const GREETING_RULES = [
  [6, '凌晨好~'], [9, '早上好~'], [12, '上午好~'],
  [14, '中午好~'], [17, '下午好~'], [19, '傍晚好~'],
  [22, '晚上好~'],
]

export const useAppStore = defineStore('app', () => {
  const hasEntered = ref(false)
  const isLoading = ref(true)
  const greeting = ref('')
  const isMemorialDay = ref(false)
  const isMemorialDayGrayscale = ref(false)
  const memorialOverride = ref({ title: '', desc: '' })
  const siteStartDate = new Date('08/24/2020 15:42:44')

  /** 站点运行时长文案 */
  const runtimeText = computed(() => {
    const diff = Date.now() - siteStartDate.getTime()
    const DAY = 24 * 60 * 60 * 1000
    const HR = 60 * 60 * 1000
    const MIN = 60 * 1000
    return `本站已运行：${~~(diff / DAY)}天${~~((diff % DAY) / HR)}小时${~~((diff % HR) / MIN)}分${~~((diff % MIN) / 1000)}秒`
  })

  /** 根据当前小时初始化问候语 */
  function initGreeting() {
    const hour = new Date().getHours()
    greeting.value = GREETING_RULES.find(([h]) => hour < h)?.[1] ?? '夜深了~'
  }

  /** 检测今天是否为纪念日 */
  function checkMemorialDay() {
    const now = new Date()
    const mon = now.getMonth() + 1
    const date = now.getDate()

    if (MEMORIAL_DAYS.some(({ m, d }) => mon === m && date === d)) {
      isMemorialDay.value = true
      isMemorialDayGrayscale.value = true
      memorialOverride.value = {
        title: 'Silence&nbsp;in&nbsp;silence',
        desc: '今天是中国国家纪念日，全站已切换为黑白模式',
      }
    }
  }

  /** 进入主页 */
  function enter() {
    hasEntered.value = true
    isLoading.value = true
  }

  /** 加载完成 */
  function finishLoading() {
    isLoading.value = false
  }

  return {
    hasEntered, isLoading, greeting, isMemorialDay, isMemorialDayGrayscale,
    memorialOverride, runtimeText,
    initGreeting, checkMemorialDay, enter, finishLoading,
  }
})
