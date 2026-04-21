import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  root: 'src/spa-shell',
  plugins: [vue()],
  build: {
    outDir: '../../dist',
    emptyOutDir: true
  }
})
