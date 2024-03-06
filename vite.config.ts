import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts(),
    vue(),
    libInjectCss(),
  ],
  build: {
    outDir: "dist",
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
