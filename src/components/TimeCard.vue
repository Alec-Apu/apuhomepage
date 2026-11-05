<script setup>
import { onMounted, computed, ref } from 'vue'
import { useClock } from '@/composables/useClock'
import { useWeatherStore } from '@/stores/weather'
import { useToast } from '@/composables/useToast'
import { WEEKDAYS } from '@/utils/constants'

const { now } = useClock()
const weather = useWeatherStore()
const { show } = useToast()

/** 天气刷新冷却标记（60 秒 CD） */
const weatherCooldown = ref(false)

/** 格式化时间显示 */
const formattedTime = computed(() => {
  const d = now.value
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  const ss = String(d.getSeconds()).padStart(2, '0')
  return [
    `${d.getFullYear()}&nbsp;年&nbsp;${d.getMonth() + 1}&nbsp;月&nbsp;${d.getDate()}&nbsp;日`,
    `<span class="weekday">${WEEKDAYS[d.getDay()]}</span><br>`,
    `<span class="time-text">${hh}:${mm}:${ss}</span>`,
  ].join('&nbsp;')
})

/** 点击刷新天气（60 秒 CD） */
const refreshWeather = () => {
  if (weatherCooldown.value) {
    show({ icon: 'fa-solid fa-circle-exclamation', message: '请稍后再更新哦', timeout: 1000 })
    return
  }
  weatherCooldown.value = true
  weather.fetchWeather()
  show({ icon: 'fa-solid fa-cloud-sun', message: '实时天气已更新', timeout: 2000 })
  setTimeout(() => { weatherCooldown.value = false }, 60000)
}

onMounted(() => weather.fetchWeather())
</script>

<template>
  <!-- 时间与天气卡片 -->
  <div class="time cards" id="upWeather" @click="refreshWeather">
    <div class="timeshow" id="time" v-html="formattedTime"></div>
    <div class="weather">
      <span id="city_text">{{ weather.city }}</span>&nbsp;
      <span id="wea_text">{{ weather.weather }}</span>&nbsp;
      <span id="tem_text">{{ weather.temperature }}</span>
      <span id="win_text">{{ weather.windDirection }}</span>
      <span id="win_speed">{{ weather.windPower }}</span>
    </div>
  </div>
</template>
