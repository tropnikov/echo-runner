import React from 'react';
import { RouterProvider } from 'react-router';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '@/redux/store';

import router from './routes';

import './index.css';

const root = document.getElementById('root');

ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
