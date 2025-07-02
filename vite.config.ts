import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';

export default defineConfig(({ command }) => {
  return {
    plugins: [react(), tsconfigPaths()],
    base: '/',
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
            target: 'http://3.218.8.20',
            changeOrigin: true,
            secure: false,
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
