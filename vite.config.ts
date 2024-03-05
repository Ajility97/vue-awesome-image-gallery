import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import typescript from "rollup-plugin-typescript2"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    typescript({
      check: false,
      include: [
          "src/components/*.vue"
      ],
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true,
          declaration: true,
          declarationMap: true
        }
      },
      exclude: [
          "vite.config.ts"
      ]

    }),
  ],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: "./src/AwesomeImageGalleryPlugin.ts",
      name: 'VueAwesomeImageGalleryPlugin',
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs")
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
