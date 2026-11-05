<script setup>
import { ref, watch } from 'vue'

const props = defineProps({ bgSrc: { type: String, default: '' } })

/** 图片加载状态：loading → 淡入过渡 */
const imgReady = ref(false)
watch(() => props.bgSrc, () => { imgReady.value = false })

function onLoad() { imgReady.value = true }
function onError() { imgReady.value = true /* 不给 error 样式阻塞 */ }
</script>

<template>
  <div class="bg-all">
    <img
      id="bg"
      :key="bgSrc"
      :src="bgSrc"
      :class="{ ready: imgReady }"
      @load="onLoad"
      @error="onError"
      alt=""
    />
    <div class="cover"></div>
  </div>
</template>

<style scoped>
.bg-all {
  background: #000;
}
#bg {
  opacity: 0;
  transition: opacity 0.6s ease;
}
#bg.ready {
  opacity: 1;
}
</style>
