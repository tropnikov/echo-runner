import { createBrowserRouter } from 'react-router';

import App from './App';
import { appRoutes } from './constants/appRoutes';

export default createBrowserRouter([
  {
    path: appRoutes.MAIN,
    Component: App,
    children: [
      { index: true, Component: () => <div>Главная страница</div> },
      {
        path: appRoutes.TOPICS,
        children: [
          { index: true, Component: () => <div>Форум</div> },
          { path: appRoutes.TOPIC, Component: () => <div>Тема форума</div> },
        ],
      },
      { path: appRoutes.SIGNIN, Component: () => <div>Авторизация</div> },
      { path: appRoutes.SIGNUP, Component: () => <div>Регистрация</div> },
      { path: appRoutes.PROFILE, Component: () => <div>Страница пользователя</div> },
      { path: appRoutes.LEADERBOARD, Component: () => <div>Лидерборд</div> },
      { path: appRoutes.GAME, Component: () => <div>Игра</div> },
      { path: appRoutes.ERROR, Component: () => <div>Ошибка 500</div> },
      { path: appRoutes.NOT_FOUND, Component: () => <div>Страница не найдена</div> },
    ],
  },
]);
