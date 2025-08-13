import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router';

import { Request as ExpressRequest } from 'express';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import { store } from '@/redux/store';

import NotificationProvider from './components/NotificationProvider/NotificationProvider';
import { createFetchRequest } from './entry-server.utils';

import './index.css';

import { Helmet } from 'react-helmet';

import { routes } from './routes';

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req);
  const context = await query(fetchRequest);

  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(dataRoutes, context);

  const html = renderToString(
    <Provider store={store}>
      <NotificationProvider>
        <StaticRouterProvider router={router} context={context} />
      </NotificationProvider>
    </Provider>,
  );

  const helmet = Helmet.renderStatic();

  return {
    html,
    helmet,
    initialState: store.getState(),
  };
};
