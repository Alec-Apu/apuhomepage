<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useMusicStore } from '@/stores/music'
import { useToast } from '@/composables/useToast'

const container = ref(null)
const musicStore = useMusicStore()
const { show } = useToast()

onMounted(async () => {
  // 初始化全功能播放器（设置面板内的 APlayer）
  try {
    await musicStore.initPlayer(container.value)
  } catch {
    setTimeout(() => {
      show({ icon: 'fa-solid fa-circle-exclamation', timeout: 8000, message: '音乐播放器加载失败' })
    }, 3800)
  }

  /** 空格键切换播放/暂停 */
  const onKeydown = (e) => {
    if (e.keyCode === 32 && document.activeElement === document.body) {
      e.preventDefault()
      musicStore.toggle()
    }
  }
  window.addEventListener('keydown', onKeydown)
  onUnmounted(() => window.removeEventListener('keydown', onKeydown))
})
</script>

<template>
  <div ref="container">
    <span v-if="musicStore.hasError">音乐播放器加载失败</span>
  </div>
</template>
