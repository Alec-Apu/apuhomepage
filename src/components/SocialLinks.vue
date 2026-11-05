<script setup>
import { socialLinks as links } from '@/utils/constants'
</script>

<template>
  <!-- 社交链接图标行 -->
  <div class="social" id="social">
    <a v-for="link in links" :key="link.id" :href="link.url" class="link" :id="link.id" target="_blank">
      <i :class="link.icon"></i>
    </a>
  </div>
</template>
