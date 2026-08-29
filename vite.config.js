import { defineConfig } from 'vite'
import wasm from 'vite-plugin-wasm'

export default defineConfig({
  plugins: [wasm()],
  build: {
    lib: {
      entry: 'client.ts',
      formats: ['es'],
      fileName: () => 'client.js'
    },
    outDir: 'src/main/resources/static',
    emptyOutDir: false,
    minify: true
  }
})
