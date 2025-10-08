import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/SPMT-Generator/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
