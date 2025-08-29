import fs from 'fs/promises';
import path from 'path';

import dotenv from 'dotenv';
import express, { Request } from 'express';
import { createServer as createViteServer, ViteDevServer } from 'vite';

import { RenderResult } from './types';
import { extractCSSModules } from './utils/cssModulesExtractor';

dotenv.config();

const port = process.env.PORT || 3000;
const clientPath = process.cwd();
const isDev = process.env.NODE_ENV === 'development';

async function createServer() {
  const app = express();
  let viteServer: ViteDevServer | undefined;

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    viteServer = await createViteServer({
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
  } else {
    app.use(express.static(path.resolve(clientPath, 'dist', 'client'), { index: false }));
  }

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl;
    let allStyles = '';

    try {
      let render: (req: Request) => Promise<RenderResult>;
      let template: string;

      if (viteServer) {
        template = await fs.readFile(path.resolve(clientPath, 'index.html'), 'utf-8');
        template = await viteServer.transformIndexHtml(url, template);
        render = (await viteServer.ssrLoadModule(path.join(clientPath, 'src/entry-server.tsx'))).render;

        const cssPath = path.resolve(clientPath, 'src/index.css');
        const indexCss = await fs.readFile(cssPath, 'utf-8');
        const cssModules = await extractCSSModules(clientPath, viteServer);

        allStyles = [
          indexCss ? `<style data-css="index.css">${indexCss}</style>` : '',
          cssModules ? `<style data-css-modules="true">${cssModules}</style>` : '',
        ]
          .filter(Boolean)
          .join('\n');
      } else {
        template = await fs.readFile(path.resolve(clientPath, 'dist', 'client', 'index.html'), 'utf-8');
        const pathToServer = path.resolve(clientPath, 'dist', 'server', 'entry-server.mjs');
        render = (await import(pathToServer)).render;
      }

      const { antStyles, html: appHtml, helmet }: RenderResult = await render(req);

      allStyles += `\n${antStyles}`;

      const html = template
        .replace(`<!--ssr-helmet-->`, `${helmet.meta.toString()} ${helmet.title.toString()} ${helmet.link.toString()}`)
        .replace(`<!--ssr-styles-->`, allStyles)
        .replace(`<!--ssr-outlet-->`, appHtml);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error) {
      if (viteServer?.ssrFixStacktrace) {
        viteServer.ssrFixStacktrace(error as Error);
      }

      console.error('SSR Error:', error);
      next(error);
    }
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

createServer();
