import React from 'react';
import { RouterProvider } from 'react-router';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import NotificationProvider from '@/components/NotificationProvider/NotificationProvider';
import { store } from '@/redux/store';

import router from './routes';

import './index.css';

import { HelmetProvider } from 'react-helmet-async';

import startServiceWorker from './helpers/sw';

startServiceWorker();

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <NotificationProvider>
          <RouterProvider router={router} />
        </NotificationProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
);
