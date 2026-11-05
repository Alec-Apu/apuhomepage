<script setup>
import { useUiStore } from '@/stores/ui'
import { useTimeCapsule } from '@/composables/useTimeCapsule'

const uiStore = useUiStore()
const { dayProgress, weekProgress, monthProgress, yearProgress } = useTimeCapsule()

/** 进度条宽度样式 */
const barStyle = (pct) => `width: ${pct}%`

import { quickLinks } from '@/utils/constants'
</script>

<template>
  <!-- 更多面板：时间胶囊 + 快捷链接 -->
  <div class="more" id="more" v-show="uiStore.isMorePanelOpen">
    <!-- 关闭按钮 -->
    <div class="close" id="close" @click="uiStore.closeMorePanel()">
      <i class="fa-solid fa-circle-xmark"></i>
    </div>
    <!-- 打开音乐播放器 -->
    <div class="open-music-more" id="openMusic" @click="uiStore.openSettings()" title="打开音乐列表">
      <i class="fa-solid fa-music"></i>
    </div>

    <!-- 时间胶囊标题 -->
    <div class="line" style="margin-top: 1rem;">
      <i class="fa-solid fa-angle-left"></i>
      <span class="line-text">时间胶囊</span>
      <i class="fa-solid fa-angle-right"></i>
    </div>

    <!-- 时间胶囊进度条（内联 ref 确保 Vue 模板正确解包） -->
    <div class="date" id="date">
      <div class="item" id="dayProgress">
        <div class="date-text" style="margin-top: 0rem;">今日已经度过了&nbsp;<span>{{ dayProgress.current }}</span>&nbsp;小时</div>
        <div class="progress"><div class="progress-bar" :style="barStyle(dayProgress.percent)">{{ dayProgress.percent }}%</div></div>
      </div>
      <div class="item" id="weekProgress">
        <div class="date-text">本周已经度过了&nbsp;<span>{{ weekProgress.current }}</span>&nbsp;天</div>
        <div class="progress"><div class="progress-bar" :style="barStyle(weekProgress.percent)">{{ weekProgress.percent }}%</div></div>
      </div>
      <div class="item" id="monthProgress">
        <div class="date-text">本月已经度过了&nbsp;<span>{{ monthProgress.current }}</span>&nbsp;天</div>
        <div class="progress"><div class="progress-bar" :style="barStyle(monthProgress.percent)">{{ monthProgress.percent }}%</div></div>
      </div>
      <div class="item" id="yearProgress">
        <div class="date-text">今年已经度过了&nbsp;<span>{{ yearProgress.current }}</span>&nbsp;个月</div>
        <div class="progress"><div class="progress-bar" :style="barStyle(yearProgress.percent)">{{ yearProgress.percent }}%</div></div>
      </div>
    </div>

    <!-- 杂七杂八标题 -->
    <div class="line">
      <i class="fa-solid fa-angle-left"></i>
      <span class="line-text">杂七杂八</span>
      <i class="fa-solid fa-angle-right"></i>
    </div>

    <!-- 快捷链接 -->
    <div v-for="(row, ri) in quickLinks" :key="ri" class="row" :style="ri > 0 ? 'margin-top: 1.5rem;' : ''">
      <div v-for="(card, ci) in row" :key="card.name" class="col" :class="{ '2': ci === 1 }">
        <a v-if="!card.isAction" :href="card.url" target="_blank">
          <div class="link-card cards"><span class="link-name">{{ card.name }}</span></div>
        </a>
        <a v-else id="openmore" @click="uiStore.openSettings()">
          <div class="link-card cards"><span class="link-name">{{ card.name }}</span></div>
        </a>
      </div>
    </div>
  </div>
</template>
