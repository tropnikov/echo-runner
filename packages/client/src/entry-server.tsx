import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router';

import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

import { Request as ExpressRequest } from 'express';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';

import { store } from '@/redux/store';

import { RenderResult } from '../server/types';
import NotificationProvider from './components/NotificationProvider/NotificationProvider';
import { createFetchRequest } from './entry-server.utils';
import { routes } from './routes';

import './index.css';

export const render = async (req: ExpressRequest): Promise<RenderResult> => {
  const { query, dataRoutes } = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req);
  const context = await query(fetchRequest);

  if (context instanceof Response) {
    throw context;
  }

  const cache = createCache();
  const router = createStaticRouter(dataRoutes, context);

  const html = renderToString(
    <StyleProvider cache={cache}>
      <Provider store={store}>
        <NotificationProvider>
          <StaticRouterProvider router={router} context={context} />
        </NotificationProvider>
      </Provider>
    </StyleProvider>,
  );

  const helmet = Helmet.renderStatic();
  const antStylesText = extractStyle(cache);

  return {
    antStyles: antStylesText,
    html,
    helmet,
    initialState: store.getState(),
  };
};
