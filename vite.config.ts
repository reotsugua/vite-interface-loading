import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://dev.grupoeuro17.com.br/euro17-link-redirector',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
