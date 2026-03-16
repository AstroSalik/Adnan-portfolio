import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
          'ui': ['lucide-react', 'recharts']
        }
      }
    }
  },
  server: {
    allowedHosts: [
      'all',
      'd340-157-48-5-135.ngrok-free.app',
    ],
    host: true,
    strictPort: true,
  },
})

