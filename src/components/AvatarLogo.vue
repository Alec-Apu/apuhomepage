<script setup>
const avatarSrc = '/img/icon/alec-avatar.png'
</script>

<template>
  <div class="main-img">
    <img
      id="logo-img"
      width="512"
      height="512"
      style="aspect-ratio: 1 / 1; height: auto; object-fit: cover; animation: none; transform: none; cursor: default; image-rendering: auto;"
      :src="avatarSrc"


      alt="Alec 的头像"
    />
    <div class="img-title">
      <span class="img-title-big" id="logo-text-1">Alecapu</span>
      <span class="img-text" id="logo-text-2">.com</span>
    </div>
  </div>
</template>
