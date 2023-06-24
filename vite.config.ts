import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://alimakhlouf-002-site4.btempurl.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
