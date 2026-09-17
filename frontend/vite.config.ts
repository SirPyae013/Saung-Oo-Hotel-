import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Keep the deployment output at the repository root for Sites hosting.
  build: { outDir: '../dist', emptyOutDir: true },
})
