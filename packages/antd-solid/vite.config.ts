import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'antdSolid',
      fileName: 'antd-solid',
    },
  },
  plugins: [solidPlugin()],
});
