<script setup>
import { useWallpaperStore } from '@/stores/wallpaper'
import { useToast } from '@/composables/useToast'

const wallpaperStore = useWallpaperStore()
const { show } = useToast()

/** 壁纸选项配置 */
const WALLPAPER_OPTIONS = [
  { value: '1', id: 'radio1', label: '默认壁纸' },
  { value: '2', id: 'radio2', label: '每日一图' },
  { value: '3', id: 'radio3', label: '随机风景' },
  { value: '4', id: 'radio4', label: '随机动漫' },
]

/** 切换壁纸类型并即时更新背景 */
const onSetType = (type) => {
  wallpaperStore.setType(type)
  show({ icon: 'fa-solid fa-image', timeout: 2500, message: '壁纸已更新' })
}
</script>

<template>
  <!-- 壁纸类型选择（v-for 替代重复的 radio 结构） -->
  <div v-for="opt in WALLPAPER_OPTIONS" :key="opt.value" class="form-radio">
    <input
      type="radio" class="set-wallpaper" style="display: none;"
      :id="opt.id" :value="opt.value" name="wallpaper-type"
      :checked="wallpaperStore.type === opt.value"
      @change="onSetType(opt.value)"
    />
    <label :for="opt.id">{{ opt.label }}</label>
  </div>
</template>
