import fs from 'fs';
import path from 'path';

import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { defineConfig, transformWithEsbuild } from 'vite';

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
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  ssr: {
    noExternal: ['react-helmet-async'],
  },
  plugins: [
    react(),
    {
      name: 'serve-sw-in-dev',
      apply: 'serve', // работает только в dev
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/sw.js') {
            const filePath = path.resolve(__dirname, 'src/sw.ts');
            try {
              const code = fs.readFileSync(filePath, 'utf-8');
              const result = await transformWithEsbuild(code, filePath, {
                loader: 'ts',
                target: 'esnext',
              });

              res.setHeader('Content-Type', 'application/javascript');
              res.end(result.code);
            } catch (err) {
              res.statusCode = 500;
              res.end(`// Error compiling Service Worker\n${err}`);
            }
          } else {
            next();
          }
        });
      },
    },
  ],
});
