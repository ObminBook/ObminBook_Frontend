import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';

export default defineConfig(({ command }) => {
  return {
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    ...(command === 'serve' && {
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
    }),
    build: {
      rollupOptions: {
        external: () => false,
      },
    },
  };
});
