import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        // Add any other Sass options you need
      }
    }
  }
})
