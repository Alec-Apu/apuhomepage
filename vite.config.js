import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        navigateFallbackDenylist: [/^\/blbl\//, /^\/dg/, /^\/meting\//, /^\/openlist\//, /^\/api\//, /^\/historytalk\//, /^\/tsbot\//, /^\/uptime\//, /^\/UnlockMusic/, /^\/wgrefresh/],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        globPatterns: ['**/*.{html,css,js,ico,png,jpg,jpeg,webp,avif,svg,ttf,woff,woff2}'],
        runtimeCaching: [
          { urlPattern: /\.(?:html|css)$/, handler: 'NetworkFirst', options: { cacheName: 'ql:html', expiration: { maxEntries: 10 } } },
          { urlPattern: /\.(?:js|css)$/, handler: 'StaleWhileRevalidate', options: { cacheName: 'ql:static', expiration: { maxEntries: 20 } } },
          { urlPattern: /\.(?:png|gif|jpg|jpeg|webp|svg|cur|ttf|woff2|woff)$/, handler: 'CacheFirst', options: { cacheName: 'ql:img', expiration: { maxEntries: 20, maxAgeSeconds: 43200 } } },
        ],
      },
      manifest: {
        name: 'Alec | Index',
        short_name: 'Alec | Index',
        description: 'Alec 的个人主页，分享学习、技术与生活。',
        display: 'standalone',
        start_url: '/',
        theme_color: '#424242',
        background_color: '#424242',
        icons: [
          { src: 'img/icon/48.png', sizes: '48x48', type: 'image/png' },
          { src: 'img/icon/72.png', sizes: '72x72', type: 'image/png' },
          { src: 'img/icon/96.png', sizes: '96x96', type: 'image/png' },
          { src: 'img/icon/128.png', sizes: '128x128', type: 'image/png' },
          { src: 'img/icon/144.png', sizes: '144x144', type: 'image/png' },
          { src: 'img/icon/192.png', sizes: '192x192', type: 'image/png' },
          { src: 'img/icon/512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {},
})
