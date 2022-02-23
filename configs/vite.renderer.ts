import { join } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import { COLOR_PALETTE } from '../src/const/theme/color';
import { MEASUREMENT } from '../src/const/theme/measurement';

import pkg from '../package.json';


// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: join(__dirname, '../src/renderer'),
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    /** import svg file as a React Component */
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
  esbuild: {
    /** jsxInject simply set esbuild's --inject transformation option and auto imports the provided module in all .jsx files. */
    jsxFactory: 'jsx',
  },
  base: './',
  build: {
    emptyOutDir: true,
    sourcemap: true,
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
        modifyVars: {
          /** Ant Design Pro theme Customization
            * https://ant.design/docs/react/customize-theme
          */
          'primary-color': `${COLOR_PALETTE.LEETECHO_BLUE}`,
          'link-color': `${COLOR_PALETTE.LEETECHO_LIGHT_BLACK}`,
          'component-background': `${COLOR_PALETTE.LEETECHO_GREY}`,
          'primary-color-hover': `${COLOR_PALETTE.LEETECHO_LIGHT_BLUE}`,
          'border-radius-base': `${MEASUREMENT.LEETECHO_BORDER_RADIUS_BASE}`,
          /** Input */
          'input-bg': `${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}`,
          'input-placeholder-color': `${COLOR_PALETTE.LEETECHO_INPUT_PLACEHOLDER_COLOR}`,
          'input-border-color': `${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}`,
          'input-hover-border-color': `${COLOR_PALETTE.LEETECHO_INPUT_HOVER_BG}`,
        }
      },
    }
  }
});

