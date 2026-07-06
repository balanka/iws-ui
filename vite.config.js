import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [react(), basicSsl()],
  build: {
    copyPublicDir: true,
    rollupOptions: {
      external: ['/env-config.js'], // not actually external, but we want to leave it alone
      output: {
        manualChunks(id, { getModuleInfo, getModuleIds }) {
          // React vendor chunk
          if (id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react-router-dom')) {
            return 'react-vendor';
          }

          // CoreUI vendor chunk
          if (id.includes('node_modules/@coreui')) {
            return 'coreui-vendor';
          }

          // Redux vendor chunk
          if (id.includes('node_modules/react-redux') ||
            id.includes('node_modules/@reduxjs/toolkit')) {
            return 'redux-vendor';
          }

          // Default - let Vite decide
          return null;
        },
      },
    },
  },
  server: {
    https: true,
    proxy: {
      '/api': {
        //target: 'https://192.168.178.102', // your Docker Nginx (HTTPS)
        target: 'https://127.0.0.1', // your Docker Nginx (HTTPS)
        changeOrigin: true,
        secure: false,                    // accept self‑signed certificate
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
    hmr: {
      host: '127.0.0.1',
      allowedHosts:'mac',
    }
  },
})
