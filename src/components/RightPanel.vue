<script setup>
import HitokotoCard from './HitokotoCard.vue'
import MusicPlayerCard from './MusicPlayerCard.vue'
import TimeCard from './TimeCard.vue'
import LinkCards from './LinkCards.vue'
</script>

<template>
  <!-- 右侧面板：一言/音乐卡片 + 时间卡片 + 网站链接 -->
  <div class="main-right">
    <div class="row rightone" id="rightone">
      <div class="col hitokotos">
        <HitokotoCard />
        <MusicPlayerCard />
      </div>
      <div class="col times">
        <TimeCard />
      </div>
    </div>
    <div class="line">
      <i class="fa-solid fa-link"></i>
      <span class="line-text">网站列表</span>
    </div>
    <div class="link">
      <LinkCards />
    </div>
  </div>
</template>
