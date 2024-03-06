import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts(),
    vue(),
  ],
  build: {
    outDir: "dist",
    cssCodeSplit: false,
    lib: {
      entry: "./src/components/index.ts",
      name: 'VueAwesomeImageGallery',
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
