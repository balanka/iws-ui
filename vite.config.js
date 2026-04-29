import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [react(), basicSsl()],
  build: {
    copyPublicDir: true,
    rollupOptions: {
      external: ['/env-config.js'], // not actually external, but we want to leave it alone
    }
  },
  server: {
    https: true,
    proxy: {
      '/api': {
        target: 'https://192.168.178.102', // your Docker Nginx (HTTPS)
        changeOrigin: true,
        secure: false,                    // accept self‑signed certificate
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
    hmr: {
      host: 'localhost',
      allowedHosts:'mac',
    }
  },
})
