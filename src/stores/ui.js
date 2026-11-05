import { defineStore } from 'pinia'
import { ref } from 'vue'

/** UI 状态管理：面板开关、移动端检测、Tab 切换 */
export const useUiStore = defineStore('ui', () => {
  const isMorePanelOpen = ref(false)
  const isSettingsModalOpen = ref(false)
  const isHitokotoVisible = ref(true)
  const activeNavTab = ref('home')
  const isMobile = ref(false)

  /** 切换更多面板，打开时自动关闭设置弹窗 */
  function toggleMorePanel() {
    isMorePanelOpen.value = !isMorePanelOpen.value
    if (isMorePanelOpen.value) isSettingsModalOpen.value = false
  }

  /** 关闭更多面板 */
  function closeMorePanel() { isMorePanelOpen.value = false }

  /** 打开设置弹窗，同时关闭更多面板 */
  function openSettings() {
    isSettingsModalOpen.value = true
    isMorePanelOpen.value = false
  }

  /** 关闭设置弹窗 */
  function closeSettings() { isSettingsModalOpen.value = false }

  /** 切换到音乐卡片视图 */
  function switchToMusic() { isHitokotoVisible.value = false }
  /** 切换到一言卡片视图 */
  function switchToHitokoto() { isHitokotoVisible.value = true }

  /** 移动端导航 Tab 切换 */
  function setActiveNavTab(tab) { activeNavTab.value = tab }

  /** 检测是否为移动端（宽度 ≤ 768px） */
  function checkMobile() {
    isMobile.value = window.innerWidth <= 768
  }

  return {
    isMorePanelOpen, isSettingsModalOpen, isHitokotoVisible, activeNavTab, isMobile,
    toggleMorePanel, closeMorePanel, openSettings, closeSettings,
    switchToMusic, switchToHitokoto, setActiveNavTab, checkMobile,
  }
})
