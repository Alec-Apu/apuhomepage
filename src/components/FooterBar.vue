<script setup>
import { useRuntimeCounter } from '@/composables/useRuntimeCounter'
import { useMusicStore } from '@/stores/music'

/** 底部栏：播放中显示歌词，否则显示版权与运行时长 */
const { runtime } = useRuntimeCounter()
const musicStore = useMusicStore()
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer id="footer" class="fixed-bottom footer">
    <div class="power" v-show="!musicStore.isPlaying">
      Copyright&nbsp;&copy;&nbsp;<span id="power-year">2020 -</span>{{ currentYear }}
      <a href="https://alecapu.com" id="power-text">Alec</a>
      &nbsp;&nbsp;<span id="runtime_span">{{ runtime }}</span>
    </div>
    <div id="lrc" v-show="musicStore.isPlaying"></div>
  </footer>
</template>
