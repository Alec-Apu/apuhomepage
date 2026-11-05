<script setup>
import { useMusicStore } from '@/stores/music'
import { useUiStore } from '@/stores/ui'
import { computed } from 'vue'

const musicStore = useMusicStore()
const uiStore = useUiStore()

/** 根据音量值动态切换图标 */
const volumeIcon = computed(() => {
  const v = musicStore.volume
  if (v === 0) return 'fa-solid fa-volume-xmark'
  if (v <= 0.3) return 'fa-solid fa-volume-off'
  if (v <= 0.6) return 'fa-solid fa-volume-low'
  return 'fa-solid fa-volume-high'
})

const onVolumeChange = (e) => musicStore.setVolume(parseFloat(e.target.value))
</script>

<template>
  <!-- 音乐播放器卡片（在主面板内嵌显示） -->
  <div class="music" id="music" v-show="!uiStore.isHitokotoVisible">
    <div class="music-all">
      <div class="music-button">
        <div id="music-open" @click="uiStore.openSettings()">音乐列表</div>
        <div id="music-close" @click="uiStore.switchToHitokoto()">回到一言</div>
      </div>
      <div class="music-control">
        <i class="fa-solid fa-backward-step" id="last" @click="musicStore.prev()"></i>
        <div id="play" @click="musicStore.toggle()">
          <i :class="musicStore.isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'"></i>
        </div>
        <i class="fa-solid fa-forward-step" id="next" @click="musicStore.next()"></i>
      </div>
      <div class="music-menu">
        <div class="music-text">
          <span id="music-name">{{ musicStore.currentTitle }}</span>
        </div>
        <div class="music-volume">
          <div id="volume-ico"><i :class="volumeIcon"></i></div>
          <input
            type="range" min="0" max="1" step="0.01" id="volume"
            :value="musicStore.volume" @input="onVolumeChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>
