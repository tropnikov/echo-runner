import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import NotificationProvider from '@/components/NotificationProvider/NotificationProvider';
import { store } from '@/redux/store';

import { routes } from './routes';

import './index.css';

import startServiceWorker from './helpers/sw';

startServiceWorker();

const router = createBrowserRouter(routes);

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
    </Provider>
  </React.StrictMode>,
);
