<script setup>
import { ref } from 'vue'
import { useUiStore } from '@/stores/ui'
import WallpaperSettings from './WallpaperSettings.vue'
import FullPlayer from './FullPlayer.vue'

const uiStore = useUiStore()
const accordionOpen = ref(true)
</script>

<template>
  <!-- 设置弹窗：壁纸设置 + 全功能播放器 -->
  <div class="box" id="box" v-show="uiStore.isSettingsModalOpen" @click.self="uiStore.closeSettings()">
    <div class="box-wrapper">
      <div class="closebox" id="closemore" @click="uiStore.closeSettings()">
        <i class="fa-solid fa-circle-xmark"></i>
      </div>
      <div class="box-left">
        <div class="img-title">
          <span class="img-title-big" id="logo-title-other">Alecapu</span>
          <span class="img-text" id="logo-title-other-small">.com</span><br />
          <span class="img-text">&nbsp;v&nbsp;6.5.21</span>
          <a href="https://github.com/Alec-Apu" target="_blank">
            <i class="fa-brands fa-github"></i>
          </a>
        </div>
        <div class="accordion" id="accordion">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button
                class="accordion-button"
                :class="{ collapsed: !accordionOpen }"
                type="button"
                @click="accordionOpen = !accordionOpen"
              >
                壁纸设置
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse" :class="{ collapse: true, show: accordionOpen }">
              <div class="accordion-body">
                <div class="set">
                  <div class="wallpaper" id="wallpaper">
                    <WallpaperSettings />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box-right">
        <div id="aplayer">
          <FullPlayer />
        </div>
      </div>
    </div>
  </div>
</template>
