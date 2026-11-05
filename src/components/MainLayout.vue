<script setup>
import { useUiStore } from '@/stores/ui'
import LeftPanel from './LeftPanel.vue'
import RightPanel from './RightPanel.vue'
import MorePanel from './MorePanel.vue'
import SettingsModal from './SettingsModal.vue'

const uiStore = useUiStore()
</script>

<template>
  <!-- 主轴布局：左侧面板 + 右侧面板 + 更多面板 + 设置弹窗 -->
  <main id="main" class="main">
    <div id="container" class="container" :class="{ mores: uiStore.isMorePanelOpen }">
      <div id="row" class="row" v-show="!uiStore.isSettingsModalOpen">
        <div class="col left"><LeftPanel /></div>
        <div class="logo cards" id="changemore" style="display: none">
          <a class="logo-text" id="logo-text-small">alecapu.com</a>
        </div>
        <div class="col right"><RightPanel /></div>
      </div>
      <!-- 移动端更多按钮 -->
      <div class="menu" id="switchmenu" v-show="!uiStore.isSettingsModalOpen">
        <a class="munu-button cards" id="menu" @click="uiStore.toggleMorePanel()">
          <i class="fa-solid fa-bars"></i>
        </a>
      </div>
      <MorePanel />
      <SettingsModal />
    </div>
  </main>
  <noscript><div class="noscript fixed-top">请开启 JavaScript</div></noscript>
</template>
