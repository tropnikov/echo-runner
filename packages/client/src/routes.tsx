import { createBrowserRouter } from 'react-router';

import App from './App';
import { appRoutes } from './constants/appRoutes';
import Topic from './pages/Forum/Topic';
import TopicList from './pages/Forum/TopicList';

export default createBrowserRouter([
  {
    path: appRoutes.MAIN,
    Component: App,
    children: [
      { index: true, element: <div>Главная страница</div> },
      {
        path: appRoutes.TOPICS,
        children: [
          { index: true, Component: TopicList },
          { path: appRoutes.TOPIC, Component: Topic },
        ],
      },
      { path: appRoutes.SIGNIN, element: <div>Авторизация</div> },
      { path: appRoutes.SIGNUP, element: <div>Регистрация</div> },
      { path: appRoutes.PROFILE, element: <div>Страница пользователя</div> },
      { path: appRoutes.LEADERBOARD, element: <div>Лидерборд</div> },
      { path: appRoutes.GAME, element: <div>Игра</div> },
      { path: appRoutes.ERROR, element: <div>Ошибка 500</div> },
      { path: appRoutes.NOT_FOUND, element: <div>Страница не найдена</div> },
    ],
  },
]);
