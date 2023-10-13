import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  css: {
    postcss: {
      plugins: [cssnano, autoprefixer]
    }
  }
})
