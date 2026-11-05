<script setup>
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()

/** 底部导航栏配置 */
const items = [
  { action: 'home', icon: 'fa-solid fa-house', label: '首页' },
  { action: 'more', icon: 'fa-solid fa-clock', label: '更多' },
  { action: 'music', icon: 'fa-solid fa-music', label: '音乐' },
  { action: 'links', icon: 'fa-solid fa-link', label: '链接' },
]

/** 导航动作映射（使用对象字面量替代 switch） */
const NAV_ACTIONS = {
  home: () => {
    if (uiStore.isMorePanelOpen) uiStore.closeMorePanel()
    uiStore.closeSettings()
  },
  more: () => {
    if (!uiStore.isMorePanelOpen) uiStore.toggleMorePanel()
  },
  music: () => uiStore.openSettings(),
  links: () => {
    if (uiStore.isMorePanelOpen) uiStore.closeMorePanel()
    uiStore.closeSettings()
  },
}

const onNavClick = (action) => {
  if (uiStore.activeNavTab === action) return
  uiStore.setActiveNavTab(action)
  NAV_ACTIONS[action]?.()
}
</script>

<template>
  <!-- 移动端底部导航栏 -->
  <nav v-if="uiStore.isMobile" id="mobile-nav" class="mobile-nav">
    <button
      v-for="item in items"
      :key="item.action"
      class="mobile-nav-item"
      :class="{ active: uiStore.activeNavTab === item.action }"
      @click="onNavClick(item.action)"
    >
      <i :class="item.icon"></i>
      <span>{{ item.label }}</span>
    </button>
  </nav>
</template>
