import fs from 'fs/promises';
import path from 'path';

import dotenv from 'dotenv';
import express from 'express';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const port = process.env.PORT || 80;
const clientPath = path.join(__dirname, '../');
const isDev = process.env.NODE_ENV !== 'production';

async function createServer() {
  const app = express();

  const viteServer = await createViteServer({
    server: {
      middlewareMode: true,
    },
    root: clientPath,
    appType: 'custom',
  });

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template = await fs.readFile(path.resolve(clientPath, 'index.html'), 'utf-8');
      template = await viteServer.transformIndexHtml(url, template);

      const { render } = await viteServer.ssrLoadModule(path.join(clientPath, 'src/entry-server.tsx'));
      const appHtml = render();

      const html = template.replace(`<!--ssr-outlet-->`, appHtml);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error) {
      viteServer.ssrFixStacktrace(error as Error);
      next(error);
    }
  });

  app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
  });
}

createServer();
