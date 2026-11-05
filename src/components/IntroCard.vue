<script setup>
import { useUiStore } from '@/stores/ui'
import { useAppStore } from '@/stores/app'
import { computed } from 'vue'

const uiStore = useUiStore()
const appStore = useAppStore()

/** 根据当前状态动态切换标题文案 */
const title = computed(() => {
  if (appStore.isMemorialDay) return 'Silence&nbsp;in&nbsp;silence'
  return uiStore.isMorePanelOpen ? 'Oops&nbsp;!' : 'Hell&nbsp;Word&nbsp;!'
})

/** 根据当前状态动态切换描述文案 */
const desc = computed(() => {
  if (appStore.isMemorialDay) return '今天是中国国家纪念日，全站已切换为黑白模式'
  return uiStore.isMorePanelOpen
    ? '哎呀，这都被你发现了（ 再点击一次可关闭 ）'
    : 'Minecraft服务器：mc.alecapu.com<br>欢迎来到我的主页！服务器咨询  |  +Q: 3441257568'
})
</script>

<template>
  <!-- 点击切换更多面板 -->
  <div class="message cards" id="switchmore" @click="uiStore.toggleMorePanel()">
    <div class="des" id="des">
      <i class="fa-solid fa-quote-left"></i>
      <div class="des-title">
        <span id="change" v-html="title"></span><br />
        <span id="change1" v-html="desc"></span>
      </div>
      <i class="fa-solid fa-quote-right"></i>
    </div>
  </div>
</template>
