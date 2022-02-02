import { join } from 'path';
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
    emptyOutDir: true,
    rollupOptions: {
      external: [
        'electron',
        ...builtinModules,
        ...Object.keys((pkg as Record<string, any>).dependencies || {}),
      ],
      output: {
        entryFileNames: '[name].cjs',
      },
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     less: {
  //       javascriptEnabled: true,
  //       modifyVars: {
  //         'root-entry-name': 'default',
  //         'primary-color': '#1DA57A',
  //         'link-color': '#1DA57A',
  //         'border-radius-base': '2px',
  //       }
  //     },
  //   }
  // },
  // resolve: {
  //   alias: [
  //     { find: /^~/, replacement: '' },
  //     { find: '@', replacement: join(__dirname, '../src/renderer/src') },
  //     { find: 'src', replacement: join(__dirname, '../src') },
  //   ]
  // }
});
