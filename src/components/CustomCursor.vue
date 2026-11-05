<script setup>
import { useCursor } from '@/composables/useCursor'

/** 自定义鼠标指针（跟随真实鼠标坐标） */
const { x, y } = useCursor()
</script>

<template>
  <div id="g-pointer-1"></div>
  <div id="g-pointer-2" :style="{ transform: `translate(${x - 9}px, ${y - 9}px)` }"></div>
</template>
