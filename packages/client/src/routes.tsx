import { createBrowserRouter } from 'react-router';

import App from './App';
import { appRoutes } from './constants/appRoutes';
import { withAuth } from './hocs/withAuth';
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
          { index: true, Component: withAuth(TopicList) },
          { path: appRoutes.TOPIC, Component: withAuth(Topic) },
        ],
      },
      { path: appRoutes.SIGNIN, Component: Login },
      { path: appRoutes.SIGNUP, Component: Registration },
      { path: appRoutes.PROFILE, Component: withAuth(ProfilePage) },
      { path: appRoutes.LEADERBOARD, element: <div>Лидерборд</div> },
      { path: appRoutes.GAME, Component: withAuth(Game) },
      { path: appRoutes.ERROR, Component: ServerError },
      { path: appRoutes.NOT_FOUND, Component: NotFound },
    ],
  },
]);
