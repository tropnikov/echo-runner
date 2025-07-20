import { createBrowserRouter } from 'react-router';

import Game from '@/pages/Game/Game';

import App from './App';
import { appRoutes } from './constants/appRoutes';
import Topic from './pages/Forum/Topic';
import TopicList from './pages/Forum/TopicList';
import Login from './pages/Login/Login';
import MainPage from './pages/MainPage/MainPage';
import Registration from './pages/Registration/Registration';

export default createBrowserRouter([
  {
    path: appRoutes.MAIN,
    Component: App,
    children: [
      { index: true, Component: MainPage },
      {
        path: appRoutes.TOPICS,
        children: [
          { index: true, Component: TopicList },
          { path: appRoutes.TOPIC, Component: Topic },
        ],
      },
      { path: appRoutes.SIGNIN, Component: Login },
      { path: appRoutes.SIGNUP, Component: Registration },
      { path: appRoutes.PROFILE, element: <div>Страница пользователя</div> },
      { path: appRoutes.LEADERBOARD, element: <div>Лидерборд</div> },
      { path: appRoutes.GAME, Component: Game },
      { path: appRoutes.ERROR, element: <div>Ошибка 500</div> },
      { path: appRoutes.NOT_FOUND, element: <div>Страница не найдена</div> },
    ],
  },
]);
