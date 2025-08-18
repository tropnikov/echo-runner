import React from 'react';
import { RouterProvider } from 'react-router';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import NotificationProvider from '@/components/NotificationProvider/NotificationProvider';
import { store } from '@/redux/store';

import router from './routes';

import './index.css';

import startServiceWorker from './helpers/sw';

if (import.meta.env.PROD) {
  startServiceWorker();
}

const root = document.getElementById('root');

ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
    </Provider>
  </React.StrictMode>,
);
