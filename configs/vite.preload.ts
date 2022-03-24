import path, { join } from 'path';
import { builtinModules } from 'module';
import { defineConfig } from 'vite';
import pkg from '../package.json';

export default defineConfig({
  mode: process.env.NODE_ENV,
  root: join(__dirname, '../src/preload'),
  build: {
    outDir: '../../dist/preload',
    lib: {
      entry: 'index.ts',
      formats: ['cjs'],
    },
    minify: process.env.NODE_ENV === 'production',
    sourcemap: process.env.NODE_ENV === 'debug',
    emptyOutDir: true,
    rollupOptions: {
      external: [
        'electron',
        '/src/const/theme/color',
        ...builtinModules,
        ...Object.keys((pkg as Record<string, any>).dependencies || {}),
      ],
      output: {
        entryFileNames: '[name].cjs',
      },
    },
    target: ['edge90', 'chrome90', 'firefox90', 'safari15'],
  },
  resolve: {
    /** rollup本身不具备路径解析能力, 需指定 ailas */
    alias: [
      { find: /^~/, replacement: '' },
      { find: 'src', replacement: join(__dirname, '../src') },
    ],
  },
});
