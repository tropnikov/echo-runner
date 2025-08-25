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
import { createFetchRequest, createUrl, prefetch } from './entry-server.utils';
import { makeStore } from './redux/store';
import { routesConfig } from './routesConfig';

export const render = async (req: Request): Promise<RenderResult> => {
  const handler = createStaticHandler(routesConfig);
  const fetchRequest = createFetchRequest(req);
  const context = await handler.query(fetchRequest);

  const store = makeStore(undefined, { req });

  await prefetch(store);
  await Promise.all(store.dispatch(generatedApi.util.getRunningQueriesThunk()));

  const url = createUrl(req);
  const foundedRoutes = matchRoutes(routesConfig, url);
  if (!foundedRoutes) {
    throw new Error(`Not found: ${url}`);
  }

  const [{ route }] = foundedRoutes;

  const preFetchData = (route as { preFetchData?: (store: ReturnType<typeof makeStore>) => Promise<unknown> })
    .preFetchData;

  if (preFetchData) {
    console.log('in prefetch');
    await preFetchData(store);
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
