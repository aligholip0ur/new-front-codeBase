import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/zoom-assist-core': {
        target: 'http://dev.ihio.gov.ir/zoomassist/',
        changeOrigin: true,
        secure: false,
      },
      '/v1': {
        target: 'http://dev.ihio.gov.ir/zoomassist/',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'http://dev.ihio.gov.ir/zoomassist/',
        changeOrigin: true,
        secure: false,
      },
      '/umg': {
        target: 'http://dev.ihio.gov.ir/zoomassist/',
        changeOrigin: true,
        secure: false,
      },
      '/pmpc-general': {
        target: 'http://dev.ihio.gov.ir/zoomassist/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
