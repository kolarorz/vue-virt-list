import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue2';
// import vueJsx from '@vitejs/plugin-vue2-jsx';
// import { createVuePlugin } from 'vite-plugin-vue2';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [vue()],
  root: './example',
  base: '',
  build: {
    outDir: path.join(__dirname, '../dist'),
    emptyOutDir: true,
  },
}));
