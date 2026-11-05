<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['loaded'])
const loadingText = ref('加载中')

onMounted(() => {
  // 等待背景图片加载完成，加载成功/失败/超时均触发 loaded 事件
  const bg = document.getElementById('bg')
  if (bg?.complete && bg.naturalWidth > 0) {
    emit('loaded')
  } else if (bg) {
    bg.addEventListener('load', () => emit('loaded'), { once: true })
    bg.addEventListener('error', () => emit('loaded'), { once: true })
    setTimeout(() => emit('loaded'), 3000) // 3 秒兜底超时
  } else {
    emit('loaded')
  }
})
</script>

<template>
  <div id="loading-box" class="loaded">
    <div class="loading-left-bg"></div>
    <div class="loading-right-bg"></div>
    <div class="spinner-box">
      <div class="loader">
        <div class="inner one"></div>
        <div class="inner two"></div>
        <div class="inner three"></div>
      </div>
      <div class="loading-word">
        <p class="loading-title">Alec | MyIndex</p>
        <span id="loading-text">{{ loadingText }}</span>
      </div>
    </div>
  </div>
</template>
