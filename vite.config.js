import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  css: {
    postcss: './postcss.config.js',
    devSourcemap: false,
  },

  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          helmet: ['react-helmet-async'],
        },
      },
    },
    
    chunkSizeWarningLimit: 100,
  },

  server: {
    open: true,
    cors: true,
  },

  preview: {
    port: 4173,
    open: true,
  },
});