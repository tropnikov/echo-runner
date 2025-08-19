import { createMemoryRouter, StaticHandlerContext, StaticRouterProvider } from 'react-router';

import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';

import { RenderResult } from '../server/types';
import App from './App';
import NotificationProvider from './components/NotificationProvider/NotificationProvider';
import { appRoutes } from './constants/appRoutes';
import MainPage from './pages/MainPage/MainPage';
import { store } from './redux/store';

// Заглушка router
const router = createMemoryRouter(
  [
    {
      path: appRoutes.MAIN,
      Component: App,
      children: [{ index: true, Component: MainPage }],
    },
  ],
  {
    initialEntries: ['/'],
    initialIndex: 0,
  },
);

// Мок context
const mockContext = {
  location: {
    pathname: '/',
    search: '',
    hash: '',
    state: null,
    key: 'default',
  },
  matches: [],
} as unknown as StaticHandlerContext;

export const render = async (): Promise<RenderResult> => {
  const cache = createCache();

  const html = renderToString(
    <StyleProvider cache={cache}>
      <Provider store={store}>
        <NotificationProvider>
          <StaticRouterProvider router={router} context={mockContext} />
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
  };
};
