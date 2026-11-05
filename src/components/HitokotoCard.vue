<script setup>
import { onMounted } from 'vue'
import { useHitokoto } from '@/composables/useHitokoto'
import { useUiStore } from '@/stores/ui'
import { useToast } from '@/composables/useToast'

const { text, from, cooldown, fetchHitokoto } = useHitokoto()
const uiStore = useUiStore()
const { show } = useToast()

// 挂载后立即拉取一条一言
onMounted(() => fetchHitokoto())

/** 点击刷新一言（带 1 秒冷却防抖） */
const onClick = () => {
  if (cooldown.value) {
    show({ icon: 'fa-solid fa-circle-exclamation', message: '你点太快了吧', timeout: 1000 })
    return
  }
  fetchHitokoto()
}
</script>

<template>
  <div class="hitokoto cards" id="hitokoto" v-show="uiStore.isHitokotoVisible" @click="onClick">
    <!-- 切换到音乐播放器 -->
    <div class="open-music" id="open-music" @click.stop="uiStore.switchToMusic()">
      <i class="fa-solid fa-compact-disc"></i>
      <span>&nbsp;打开音乐播放器</span>
    </div>
    <div class="hitokoto-all">
      <div class="hitokoto-text"><span id="hitokoto_text">{{ text }}</span></div>
      <div class="hitokoto-from">-「&nbsp;<span id="from_text">{{ from }}</span>&nbsp;」</div>
    </div>
  </div>
</template>
