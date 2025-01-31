import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        format: 'es',
        inlineDynamicImports: true,
      },
    },
  },
  optimizeDeps: {
    include: ['jspdf', 'html2canvas'],
    esbuildOptions: {
      // Lisensiya matnlarini e'tiborsiz qoldiradi
      legalComments: 'none',
    },
  },
  define: {
    'process.env': {},
  },
});
