import { defineConfig } from 'vite'

export default defineConfig({
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
