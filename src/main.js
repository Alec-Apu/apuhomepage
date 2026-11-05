import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// 全局样式导入
import './assets/styles/animations.css'
import './assets/styles/first-screen.css'
import './assets/styles/loading.css'
import './assets/styles/style.css'
import './assets/styles/mobile.css'

// 创建 Vue 应用实例，挂载 Pinia 状态管理
const app = createApp(App)
app.use(createPinia())
app.mount('#app')
