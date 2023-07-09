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
  },
  test: {
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
    // speed up since tests don't rely on css
    // https://github.com/vitest-dev/vitest/blob/main/examples/react-testing-lib/vite.config.ts#L14-L16
		css: false,
  },
})
