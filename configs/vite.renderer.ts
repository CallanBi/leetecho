import { join } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import { COLOR_PALETTE } from '../src/const/theme/color';
import { MEASUREMENT } from '../src/const/theme/measurement';
import { dataToEsm } from '@rollup/pluginutils';

import pkg from '../package.json';
// import { markdownPlugin } from 'vite-plugin-markdown';

import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: join(__dirname, '../src/renderer'),
  plugins: [
    {
      name: 'vite-plugin-markdown',
      enforce: 'pre',
      transform(code: string, id: string) {
        if (!id.endsWith('.md')) return null;

        return dataToEsm(code);
      },
    },
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
    visualizer(),
  ],
  esbuild: {
    /** jsxInject simply set esbuild's --inject transformation option and auto imports the provided module in all .jsx files. */
    jsxFactory: 'jsx',
  },
  base: './',
  build: {
    emptyOutDir: true,
    sourcemap: process.env.NODE_ENV === 'debug',
    outDir: '../../dist/renderer',
    target: ['edge90', 'chrome90', 'firefox90', 'safari15'],
  },
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      { find: '@', replacement: join(__dirname, '../src/renderer/src') },
      { find: 'src', replacement: join(__dirname, '../src') },
    ],
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
          'border-color-base': `${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}`,
          'border-color-split': `${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}`,
          'background-color-base': `${COLOR_PALETTE.LEETECHO_WHITE}`,
          'item-hover-bg': `${COLOR_PALETTE.LEETECHO_INPUT_HOVER_BG}`,
          // 'primary-1': `${COLOR_PALETTE.LEETECHO_LIGHT_BLUE}`,

          /** Tips color */
          'success-color': `${COLOR_PALETTE.LEETECHO_GREEN}`,
          'warning-color': `${COLOR_PALETTE.LEETECHO_YELLOW}`,
          'error-color': `${COLOR_PALETTE.LEETECHO_RED}`,

          /** Input */
          'input-bg': `${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}`,
          'input-placeholder-color': `${COLOR_PALETTE.LEETECHO_INPUT_PLACEHOLDER_COLOR}`,
          'input-border-color': `${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}`,
          'input-hover-border-color': `${COLOR_PALETTE.LEETECHO_INPUT_HOVER_BG}`,

          /** Table */
          'table-bg': `${COLOR_PALETTE.LEETECHO_WHITE}`,
          'table-header-bg': `${COLOR_PALETTE.LEETECHO_WHITE}`,
          'table-row-hover-bg': `${COLOR_PALETTE.LEETECHO_INPUT_HOVER_BG}`,
          'table-border-color': `${COLOR_PALETTE.LEETECHO_WHITE}`,
          'table-header-cell-split-color': `${COLOR_PALETTE.LEETECHO_WHITE}`,

          /** Select */
          'select-background': `${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}`,
          'select-item-selected-color': `${COLOR_PALETTE.LEETECHO_BLUE}`,
        },
      },
    },
  },
});
