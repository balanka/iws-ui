import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['babel-plugin-react-compiler', {
            sources: (filename) => filename.includes('src/form/')
          }],
        ],
      },
    }),
    basicSsl(),
    tailwindcss(),
  ],

  resolve: {
    dedupe: ['react', 'react-dom', 'react/jsx-runtime'],
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime'],
  },

  build: {
    copyPublicDir: true,
    rollupOptions: {
      external: ['/env-config.js'],
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('node_modules/react-redux') || id.includes('node_modules/@reduxjs')) return 'redux-vendor'
          if (id.includes('node_modules/@coreui')) return 'coreui-vendor'
          if (id.includes('node_modules/ag-grid')) return 'aggrid-vendor'
          if (id.includes('node_modules/@mui') || id.includes('node_modules/@emotion')) return 'mui-vendor'
          if (id.includes('node_modules/react-datepicker') || id.includes('node_modules/@floating-ui')) return 'datepicker-vendor'
          if (
            /node_modules\/react(\/|$)/.test(id) ||
            /node_modules\/react-dom(\/|$)/.test(id) ||
            /node_modules\/react-router(-dom)?(\/|$)/.test(id) ||
            /node_modules\/scheduler(\/|$)/.test(id)
          ) return 'react-vendor'
          return null
        },
      },
    },
  },

  server: {
    https: true,
    proxy: {
      '/api': {
        target: 'https://127.0.0.1',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
    hmr: {
      host: '127.0.0.1',
      allowedHosts: 'mac',
    },
  },
})
