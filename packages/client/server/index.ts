import fs from 'fs/promises';
import path from 'path';

import dotenv from 'dotenv';
import express, { Request as ExpressRequest } from 'express';
import { HelmetData } from 'react-helmet';
import serialize from 'serialize-javascript';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const port = process.env.PORT || 3000;
const clientPath = path.join(__dirname, '../');

async function createServer() {
  const app = express();

  const viteServer = await createViteServer({
    server: {
      middlewareMode: true,
    },
    root: clientPath,
    appType: 'custom',
  });

  app.use(viteServer.middlewares);

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template = await fs.readFile(path.resolve(clientPath, 'index.html'), 'utf-8');
      template = await viteServer.transformIndexHtml(url, template);

      const { render } = (await viteServer.ssrLoadModule(path.join(clientPath, 'src/entry-server.tsx'))) as {
        render: (req: ExpressRequest) => Promise<{ html: string; helmet: HelmetData; initialState: unknown }>;
      };
      const { html: appHtml, helmet, initialState } = await render(req);

      const html = template
        .replace(`<!--ssr-helmet-->`, `${helmet.meta.toString()} ${helmet.title.toString()} ${helmet.link.toString()}`)
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
