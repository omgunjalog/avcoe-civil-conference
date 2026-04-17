import { existsSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const cleanupUnusedPublicAssets = () => ({
  name: 'cleanup-unused-public-assets',
  closeBundle() {
    const distDir = resolve(__dirname, 'dist')
    const unusedAssets = [
      'committee-photos/hon-shri-balasaheb-b-thorat.png',
      'committee-photos/hon-mrs-sharayu-deshmukh-portrait.jpg',
    ]

    unusedAssets.forEach((assetPath) => {
      const fullPath = resolve(distDir, assetPath)
      if (existsSync(fullPath)) {
        rmSync(fullPath, { force: true })
      }
    })
  },
})

export default defineConfig({
  plugins: [react(), tailwindcss(), cleanupUnusedPublicAssets()],
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-router-dom')) return 'router'
          if (id.includes('lucide-react')) return 'icons'
          return 'vendor'
        },
      },
    },
  },
})
