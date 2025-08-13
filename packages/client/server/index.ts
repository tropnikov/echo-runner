import fs from 'fs/promises';
import path from 'path';

import dotenv from 'dotenv';
import express from 'express';
import serialize from 'serialize-javascript';
import { createServer as createViteServer } from 'vite';

import { RenderResult } from './types';

dotenv.config();

const port = process.env.PORT || 3000;
const clientPath = path.join(__dirname, '../../');

async function createServer() {
  const app = express();

  const viteServer = await createViteServer({
    server: {
      middlewareMode: true,
    },
    root: clientPath,
    appType: 'custom',
    css: {
      devSourcemap: true,
    },
  });

  app.use(viteServer.middlewares);

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template = await fs.readFile(path.resolve(clientPath, 'index.html'), 'utf-8');
      const { render } = await viteServer.ssrLoadModule(path.join(clientPath, 'src/entry-server.tsx'));

      template = await viteServer.transformIndexHtml(url, template);

      const { antStyles, html: appHtml, helmet, initialState }: RenderResult = await render(req);
      let indexCss = '';

      try {
        const cssPath = path.resolve(clientPath, 'src/index.css');
        indexCss = await fs.readFile(cssPath, 'utf-8');
      } catch (error) {
        console.warn('Could not read CSS file:', error);
      }

      const allStyles = [indexCss ? `<style data-vite-dev-id="index.css">${indexCss}</style>` : '', antStyles ?? '']
        .filter(Boolean)
        .join('');

      const html = template
        .replace(`<!--ssr-helmet-->`, `${helmet.meta.toString()} ${helmet.title.toString()} ${helmet.link.toString()}`)
        .replace(`<!--ssr-styles-->`, allStyles)
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(
          `<!--ssr-initial-state-->`,
          `<script>window.APP_INITIAL_STATE = ${serialize(initialState, {
            isJSON: true,
          })}</script>`,
        );
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error) {
      viteServer.ssrFixStacktrace(error as Error);
      next(error);
    }
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

createServer();
