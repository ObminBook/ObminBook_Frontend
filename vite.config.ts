import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // підтримка alias з tsconfig
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // можеш залишити для надійності, але плагін підхопить із tsconfig
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://obminbook.us-east-1.elasticbeanstalk.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
