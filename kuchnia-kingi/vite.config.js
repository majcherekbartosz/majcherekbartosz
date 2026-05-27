import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('html2pdf') || id.includes('jspdf') || id.includes('html2canvas')) {
            return 'pdf-vendor';
          }
        },
      },
    },
  },
});
