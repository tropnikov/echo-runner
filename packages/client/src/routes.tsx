import { createBrowserRouter } from 'react-router';

import App from './App';
import { appRoutes } from './constants/appRoutes';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import MainPage from './pages/MainPage/MainPage';

export default createBrowserRouter([
  {
    path: appRoutes.MAIN,
    Component: App,
    children: [
      { index: true, Component: MainPage },
      {
        path: appRoutes.TOPICS,
        children: [
          { index: true, element: <div>Форум</div> },
          { path: appRoutes.TOPIC, element: <div>Тема форума</div> },
        ],
      },
      { path: appRoutes.SIGNIN, Component: Login },
      { path: appRoutes.SIGNUP, Component: Registration },
      { path: appRoutes.PROFILE, element: <div>Страница пользователя</div> },
      { path: appRoutes.LEADERBOARD, element: <div>Лидерборд</div> },
      { path: appRoutes.GAME, element: <div>Игра</div> },
      { path: appRoutes.ERROR, element: <div>Ошибка 500</div> },
      { path: appRoutes.NOT_FOUND, element: <div>Страница не найдена</div> },
    ],
  },
]);
