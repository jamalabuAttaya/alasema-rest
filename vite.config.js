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
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    host: '127.0.0.1',
    open: false,
    cors: false,
    strictPort: true,
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
    open: false,
    cors: false,
    strictPort: true,
  },
});
