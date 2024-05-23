import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import glsl from 'vite-plugin-glsl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), glsl()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: '[name].[hash][extname]',
      },
    },
  },
  assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.stl', '**/*.env'],
});
