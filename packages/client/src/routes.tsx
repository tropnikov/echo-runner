import { Component } from 'react';
import { createBrowserRouter } from 'react-router';

import NotFound from '@/pages/NotFound/NotFound';
import ServerError from '@/pages/ServerError/ServerError';

import App from './App';
import { appRoutes } from './constants/appRoutes';
import Login from './pages/Login/Login';

export default createBrowserRouter([
  {
    path: appRoutes.MAIN,
    Component: App,
    children: [
      { index: true, element: <div>Главная страница</div> },
      {
        path: appRoutes.TOPICS,
        children: [
          { index: true, element: <div>Форум</div> },
          { path: appRoutes.TOPIC, element: <div>Тема форума</div> },
        ],
      },
      { path: appRoutes.SIGNIN, Component: Login },
      { path: appRoutes.SIGNUP, element: <div>Регистрация</div> },
      { path: appRoutes.PROFILE, element: <div>Страница пользователя</div> },
      { path: appRoutes.LEADERBOARD, element: <div>Лидерборд</div> },
      { path: appRoutes.GAME, element: <div>Игра</div> },
      { path: appRoutes.ERROR, Component: ServerError },
      { path: appRoutes.NOT_FOUND, Component: NotFound },
    ],
  },
]);
