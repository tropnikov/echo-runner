import { createBrowserRouter } from 'react-router';

import App from './App';
import { appRoutes } from './constants/appRoutes';
import Topic from './pages/Forum/Topic';
import TopicList from './pages/Forum/TopicList';
import Game from './pages/Game/Game';
import Login from './pages/Login/Login';
import MainPage from './pages/MainPage/MainPage';
import NotFound from './pages/NotFound/NotFound';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Registration from './pages/Registration/Registration';
import ServerError from './pages/ServerError/ServerError';

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
      { path: appRoutes.PROFILE, Component: ProfilePage },
      { path: appRoutes.LEADERBOARD, element: <div>Лидерборд</div> },
      {
        path: appRoutes.GAME,
        Component: Game,
      },
      { path: appRoutes.ERROR, Component: ServerError },
      { path: appRoutes.NOT_FOUND, Component: NotFound },
    ],
  },
]);
