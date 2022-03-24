import { join } from 'path';
import { builtinModules } from 'module';
import { defineConfig } from 'vite';
import pkg from '../package.json';
import { dataToEsm } from '@rollup/pluginutils';

export default defineConfig({
  mode: process.env.NODE_ENV,
  root: join(__dirname, '../src/main'),
  plugins: [
    {
      name: 'vite-plugin-markdown',
      enforce: 'pre',
      transform(code: string, id: string) {
        if (!id.endsWith('.md')) return null;

        return dataToEsm(code);
      },
    },
  ],
  build: {
    outDir: '../../dist/main',
    lib: {
      entry: 'index.ts',
      formats: ['cjs'],
    },
    minify: process.env./* from mode option */ NODE_ENV === 'production',
    sourcemap: process.env./* from mode option */ NODE_ENV === 'debug',
    emptyOutDir: true,
    rollupOptions: {
      external: ['electron', ...builtinModules, ...Object.keys((pkg as Record<string, any>).dependencies || {})],
      output: {
        entryFileNames: '[name].cjs',
      },
    },
    target: ['edge90', 'chrome90', 'firefox90', 'safari15'],
  },
});
