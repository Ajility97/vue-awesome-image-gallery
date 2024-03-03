import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  outDir: 'dist',
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'VueAwesomeImageGallery'
    },

    rollupOptions: {
      external: ['vue'],
      output: [
        {
          globals: {
            vue: 'Vue'
          }
        }
      ]
    }
  }
})
