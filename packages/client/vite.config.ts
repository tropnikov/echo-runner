import path from 'path';

import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

dotenv.config();

export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
    host: true,
  },
  build: {
    outDir: 'dist/client',
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001,
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  ssr: {
    noExternal: ['react-helmet-async'],
  },
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      injectRegister: 'auto',
      manifest: false,
      injectManifest: {
        injectionPoint: null,
      },
      srcDir: './src',
      filename: 'sw.ts',
      workbox: {
        globPatterns: ['**/*.js,css,html,png,svg'],
      },
    }),
  ],
});
