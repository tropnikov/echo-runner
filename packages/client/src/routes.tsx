import { createBrowserRouter, createMemoryRouter } from 'react-router';

import App from './App';
import { appRoutes } from './constants/appRoutes';
import { withAuth } from './hocs/withAuth';
import Topic from './pages/Forum/Topic';
import TopicList from './pages/Forum/TopicList';
import Game from './pages/Game/Game';
import LeaderboardPage from './pages/LeaderboardPage/LeaderboardPage';
import Login from './pages/Login/Login';
import MainPage from './pages/MainPage/MainPage';
import NotFound from './pages/NotFound/NotFound';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Registration from './pages/Registration/Registration';
import ServerError from './pages/ServerError/ServerError';

export const routes = [
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
      { path: appRoutes.LEADERBOARD, Component: withAuth(LeaderboardPage) },
      { path: appRoutes.GAME, Component: withAuth(Game) },
      { path: appRoutes.ERROR, Component: ServerError },
      { path: appRoutes.NOT_FOUND, Component: NotFound },
    ],
  },
];

export const createRouter = (initialEntries?: string[]) => {
  if (typeof window !== 'undefined') {
    return createBrowserRouter(routes);
  }

  return createMemoryRouter(routes, { initialEntries: initialEntries || ['/'] });
};
