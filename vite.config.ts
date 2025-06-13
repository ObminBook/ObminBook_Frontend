import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';

export default defineConfig(({ command }) => {
  return {
    plugins: [react(), tsconfigPaths()],
    base: './',
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
            target: 'https://obminbook.us-east-1.elasticbeanstalk.com',
            changeOrigin: true,
            secure: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
      },
    }),
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        external: () => false,
      },
    },
    // Копіюємо _redirects файл в білд
    publicDir: 'public',
    css: {
      modules: {
        scopeBehaviour: 'local',
        generateScopedName: '[name]__[local]__[hash:base64:5]',
        localsConvention: 'camelCase',
        globalModulePaths: [/global\.module\.scss$/],
      },
    },
  };
});
