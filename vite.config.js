import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
  server: {
    https: {
      key: fs.readFileSync('./private/privkey.pem'),
      cert: fs.readFileSync('./private/fullchain.pem'),
    },
  },
})
