import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 部署為 GitHub Pages 專案頁：https://wade0325.github.io/collections_web/
export default defineConfig({
  base: '/collections_web/',
  plugins: [react(), tailwindcss()],
})
