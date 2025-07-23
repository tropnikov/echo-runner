import React from 'react';
import { RouterProvider } from 'react-router';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import AuthProvider from '@/components/AuthProvider/AuthProvider';
import NotificationProvider from '@/components/NotificationProvider/NotificationProvider';
import { store } from '@/redux/store';

import router from './routes';

import './index.css';

function startServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch((error: string) => {
          console.log('ServiceWorker registration failed: ', error);
        });
    });
  }
}

startServiceWorker();

const root = document.getElementById('root');

ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <NotificationProvider>
          <RouterProvider router={router} />
        </NotificationProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
);
