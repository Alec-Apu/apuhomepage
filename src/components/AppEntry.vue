<script setup>
import { useAppStore } from '@/stores/app'
import { useUiStore } from '@/stores/ui'
import { useMusicStore } from '@/stores/music'
import { useWallpaperStore } from '@/stores/wallpaper'
import { useToast } from '@/composables/useToast'
import { onMounted } from 'vue'
import FirstScreen from './FirstScreen.vue'
import LoadingScreen from './LoadingScreen.vue'
import BackgroundLayer from './BackgroundLayer.vue'
import CustomCursor from './CustomCursor.vue'
import MainLayout from './MainLayout.vue'
import MobileNavBar from './MobileNavBar.vue'
import FooterBar from './FooterBar.vue'
import ToastContainer from './ToastContainer.vue'

const appStore = useAppStore()
const uiStore = useUiStore()
const musicStore = useMusicStore()
const wallpaperStore = useWallpaperStore()
const { show } = useToast()

// 挂载后从 Cookie 恢复壁纸设置
onMounted(() => wallpaperStore.loadFromCookies())

/** 进入主页：解锁 AudioContext + 标记自动播放 */
function onEnter() {
  appStore.enter()
  // 通过创建 AudioContext 解锁浏览器的自动播放策略
  const AudioCtx = window.AudioContext ?? window.webkitAudioContext
  AudioCtx && (new AudioCtx()).resume()?.then(() => {})?.catch(() => {})
  musicStore.markAutoplay()
}

/** 加载完成后的欢迎 Toast */
function onLoaded() {
  appStore.finishLoading()
  setTimeout(() => {
    show({ icon: 'fa-solid fa-mug-hot', message: `${appStore.greeting} 欢迎来到我的主页`, timeout: 2500 })
  }, 800)
}
</script>

<template>
  <!-- 首次访问 → 显示欢迎首屏 -->
  <FirstScreen v-if="!appStore.hasEntered" :bg-src="wallpaperStore.currentSrc" @enter="onEnter" />
  <!-- 加载过渡动画 -->
  <LoadingScreen v-if="appStore.hasEntered && appStore.isLoading" @loaded="onLoaded" />
  <!-- 主界面 -->
  <template v-if="appStore.hasEntered && !appStore.isLoading">
    <BackgroundLayer :bg-src="wallpaperStore.currentSrc" />
    <CustomCursor />
    <section id="section" class="section">
      <MainLayout />
      <MobileNavBar />
      <FooterBar v-show="!uiStore.isSettingsModalOpen" />
    </section>
  </template>
  <ToastContainer />
</template>
