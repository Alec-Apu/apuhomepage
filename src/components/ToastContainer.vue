<script setup>
import { useToast } from '@/composables/useToast'

/** 全局 Toast 通知容器（Teleport 到 body） */
const { toasts } = useToast()
</script>

<template>
  <Teleport to="body">
    <div class="toast-container">
      <div v-for="toast in toasts" :key="toast.id" class="toast-item">
        <i v-if="toast.icon" :class="toast.icon"></i>
        <div class="toast-body"><span class="toast-message">{{ toast.message }}</span></div>
      </div>
    </div>
  </Teleport>
</template>

<style>
.toast-container {
  position: fixed; top: 12px; left: 50%; transform: translateX(-50%);
  z-index: 999999; display: flex; flex-direction: column; align-items: center;
  gap: 8px; pointer-events: none;
}
.toast-item {
  display: flex; align-items: center; gap: 10px; padding: 14px 24px;
  border: 1px solid transparent;
  background: linear-gradient(rgba(255,255,255,.05),rgba(255,255,255,.05)) padding-box,
              linear-gradient(to right,rgba(255,255,255,.02) 0%,transparent 50%,rgba(255,255,255,.08) 100%) border-box !important;
  -webkit-backdrop-filter: blur(2px) !important;
  backdrop-filter: blur(2px) !important;
  box-shadow: 0 8px 32px rgba(0,0,0,.1),inset 0 1px 0 rgba(255,255,255,.4) !important;
  border-radius: 28px; color: #efefef; font-size: 16px;
  animation: toast-in .5s cubic-bezier(.34,1.56,.64,1);
  pointer-events: auto;
}
@keyframes toast-in {
  0% { opacity: 0; transform: translateY(-20px) scale(.9); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
.toast-item i { font-size: 1.2rem; margin-top: 1px; }
.toast-body { line-height: 20px; }
.toast-message { word-break: break-all; }
@media (max-width: 768px) {
  .toast-item {
    border-radius: 34px !important; max-width: 260px !important;
    padding: 12px 18px; backdrop-filter: blur(25px) !important;
    -webkit-backdrop-filter: blur(25px) !important;
    box-shadow: 0 12px 40px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.15) !important;
    font-size: 14px !important;
  }
}
</style>
