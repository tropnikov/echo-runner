import { createStaticHandler, createStaticRouter, matchRoutes, StaticRouterProvider } from 'react-router';

import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

import type { Request } from 'express';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import type { HelmetServerState } from 'react-helmet-async';
import { Provider } from 'react-redux';

import { api as generatedApi } from '@/api/generated';

import { RenderResult } from '../server/types';
import NotificationProvider from './components/NotificationProvider/NotificationProvider';
import { createContext, createFetchRequest, createUrl } from './entry-server.utils';
import { makeStore } from './redux/store';
import { routesConfig } from './routesConfig';

export const render = async (req: Request): Promise<RenderResult> => {
  const handler = createStaticHandler(routesConfig);
  const fetchRequest = createFetchRequest(req);
  const context = await handler.query(fetchRequest);

  const store = makeStore(undefined, { ctx: createContext(req) });

  const url = createUrl(req);
  const foundRoutes = matchRoutes(routesConfig, url);
  if (!foundRoutes) {
    throw new Error(`Страница не найдена! ${url}`);
  }

  const [
    {
      route: { preFetchData },
    },
  ] = foundRoutes;

  console.log(req.headers);

  if (preFetchData) {
    try {
      await preFetchData({ store });
    } catch (e) {
      console.log('Инициализация страницы произошла с ошибкой', e);
    }
  }

  await Promise.all(store.dispatch(generatedApi.util.getRunningQueriesThunk()));

  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(handler.dataRoutes, context);

  const cache = createCache();
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StyleProvider cache={cache}>
        <Provider store={store}>
          <NotificationProvider>
            <StaticRouterProvider router={router} context={context} />
          </NotificationProvider>
        </Provider>
      </StyleProvider>
    </HelmetProvider>,
  );

  const antStylesText = extractStyle(cache);
  const { helmet } = helmetContext;

  return {
    antStyles: antStylesText,
    html,
    helmet,
    initialState: store.getState(),
  };
};
