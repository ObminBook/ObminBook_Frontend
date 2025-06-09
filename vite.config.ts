import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // автоматично підтягує alias з tsconfig.json
  ],
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
