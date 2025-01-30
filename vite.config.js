import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          jspdf: ['jspdf'],
          html2canvas: ['html2canvas']
        }
      }
    }
  },
  resolve: {
    alias: {
      'canvas': 'null-loader'
    }
  }
})