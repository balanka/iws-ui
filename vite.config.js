import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      host: '192.168.1.139',
      allowedHosts:'mac',
    }
  }
})
