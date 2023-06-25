import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'cssinjs',
      fileName: 'cssinjs',
    },
    outDir: './lib',
  },
  plugins: [solidPlugin(), dts()],
});
