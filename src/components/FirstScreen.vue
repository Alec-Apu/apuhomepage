<script setup>
defineProps({ bgSrc: { type: String, default: '' } })
const emit = defineEmits(['enter'])
</script>

<template>
  <!-- 欢迎首屏：背景 + 进入按钮 -->
  <div
    id="first-screen"
    :style="{
      backgroundImage: bgSrc ? `url(${bgSrc})` : '',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <div class="first-screen-content">
      <div class="first-screen-title">Alec-apu</div>
      <div class="first-screen-subtitle">点击进入，享受音乐</div>
      <button class="first-screen-button" @click="emit('enter')">进入主页</button>
    </div>
  </div>
</template>
