import { createStaticHandler, createStaticRouter, matchRoutes, StaticRouterProvider } from 'react-router';

import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

import type { Request, Response } from 'express';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import type { HelmetServerState } from 'react-helmet-async';
import { Provider } from 'react-redux';

import { api as generatedApi } from '@/api/generated';

import { RenderResult } from '../server/types';
import NotificationProvider from './components/NotificationProvider/NotificationProvider';
import { createContext, createFetchRequest, createUrl, prefetch } from './entry-server.utils';
import { makeStore } from './redux/store';
import { routesConfig } from './routesConfig';

export const render = async (req: Request, res?: Response): Promise<RenderResult> => {
  const handler = createStaticHandler(routesConfig);
  const fetchRequest = createFetchRequest(req);
  const context = await handler.query(fetchRequest);

  const context_data = createContext(req, res);
  const store = makeStore(undefined, { ctx: context_data });

  const hasCookies = context_data.cookies && Object.keys(context_data.cookies).length > 0;

  await prefetch(store, hasCookies);

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

  if (preFetchData) {
    try {
      await preFetchData({ store });
    } catch (e) {
      console.log('Инициализация страницы произошла с ошибкой', e);
    }
  }

  try {
    const runningQueries = store.dispatch(generatedApi.util.getRunningQueriesThunk());
    await Promise.all(runningQueries);
  } catch (error) {
    console.log('Error waiting for running queries (ignoring):', error);
  }

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
