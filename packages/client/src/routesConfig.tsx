import { RouteObject } from 'react-router';

import { api as generatedApi } from '@/api/generated';
import { teamName } from '@/constants/leaderboardStats';
import { AppStore } from '@/redux/store';

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

type ExtendedRouteObject = RouteObject & {
  preFetchData?: (store: AppStore) => Promise<unknown>;
  children?: ExtendedRouteObject[];
};

export const routesConfig: ExtendedRouteObject[] = [
  {
    path: appRoutes.MAIN,
    Component: App,
    preFetchData: (store) => {
      return store.dispatch(generatedApi.endpoints.getAuthUser.initiate());
    },
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
      {
        path: appRoutes.PROFILE,
        Component: withAuth(ProfilePage),
        preFetchData: (store) => store.dispatch(generatedApi.endpoints.getAuthUser.initiate()),
      },
      {
        path: appRoutes.LEADERBOARD,
        Component: withAuth(LeaderboardPage),
        preFetchData: (store) =>
          store.dispatch(
            generatedApi.endpoints.postLeaderboardByTeamName.initiate({
              teamName,
              leaderboardRequest: { ratingFieldName: 'score', cursor: 0, limit: 10 },
            }),
          ),
      },
      { path: appRoutes.GAME, Component: withAuth(Game) },
      { path: appRoutes.ERROR, Component: ServerError },
      { path: appRoutes.NOT_FOUND, Component: NotFound },
    ],
  },
];
