import { defineStore } from 'pinia'
import { ref } from 'vue'

const AMAP_KEY = import.meta.env.VITE_AMAP_KEY

const IPV4_SERVICES = [
  'https://api-ipv4.ip.sb/ip',
  'https://ipv4.icanhazip.com',
]

async function getIPv4() {
  for (const url of IPV4_SERVICES) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) })
      return (await res.text()).trim()
    } catch { /* try next */ }
  }
  throw new Error('Unable to get IPv4')
}

export const useWeatherStore = defineStore('weather', () => {
  const city = ref('天气')
  const weather = ref('加载失败')
  const temperature = ref('')
  const windDirection = ref('')
  const windPower = ref('')
  const error = ref(false)

  async function fetchWeather() {
    error.value = false
    try {
      // 获取 IPv4 地址（高德 IP API 不支持 IPv6，必须显式传 IPv4）
      const userIp = await getIPv4()

      const locRes = await fetch(`https://restapi.amap.com/v3/ip?key=${AMAP_KEY}&ip=${userIp}`)
      const locData = await locRes.json()
      if (locData.status !== '1') throw new Error('定位失败')

      city.value = locData.city || '未知'

      // 根据 adcode 获取天气
      const weaRes = await fetch(`https://restapi.amap.com/v3/weather/weatherInfo?key=${AMAP_KEY}&city=${locData.adcode}`)
      const weaData = await weaRes.json()

      const live = weaData?.lives?.[0]
      if (live) {
        weather.value = live.weather
        temperature.value = `${live.temperature}°C`
        windDirection.value = `${live.winddirection}风`
        windPower.value = `${live.windpower}级`
      }
    } catch (err) {
      console.error('Weather fetch failed:', err)
      error.value = true
    }
  }

  return { city, weather, temperature, windDirection, windPower, error, fetchWeather }
})
