import { join } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import pkg from '../package.json';

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: join(__dirname, '../src/renderer'),
  plugins: [
    react(),
  ],
  esbuild: {
    /** jsxInject simply set esbuild's --inject transformation option and auto imports the provided module in all .jsx files. */
    jsxFactory: `jsx`,
    /** jsxFactory overrides the default React.creatElement with emotionsjsx` factory function. */
    jsxInject: `import { jsx, css } from '@emotion/react'`,
  },
  base: './',
  build: {
    emptyOutDir: true,
    outDir: '../../dist/renderer',
  },
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      { find: '@', replacement: join(__dirname, '../src/renderer/src') },
      { find: 'src', replacement: join(__dirname, '../src') },
    ]
  },
  server: {
    host: pkg.env.HOST,
    port: pkg.env.PORT,
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // modifyVars: {
        //   'root-entry-name': 'default',
        //   'primary-color': '#1DA57A',
        //   'link-color': '#1DA57A',
        //   'border-radius-base': '2px',
        // }
      },
    }
  }
});

