import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/OPI-lab3-catalog/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.jsx', 'src/**/*.js'],
      exclude: ['src/main.jsx'] // Исключаем точку входа из покрытия
    }
  }
})