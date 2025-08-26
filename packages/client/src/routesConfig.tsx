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
  preFetchData?: ({ store }: { store: AppStore }) => Promise<unknown>;
  children?: ExtendedRouteObject[];
};

export const routesConfig: ExtendedRouteObject[] = [
  {
    path: appRoutes.MAIN,
    Component: App,
    preFetchData: () => {
      return Promise.resolve();
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
        preFetchData: async ({ store }) => {
          try {
            return await store.dispatch(generatedApi.endpoints.getAuthUser.initiate()).unwrap();
          } catch (error) {
            console.log('Profile preFetchData: Auth failed, will be handled on the client', error);
            return null;
          }
        },
      },
      {
        path: appRoutes.LEADERBOARD,
        Component: withAuth(LeaderboardPage),
        preFetchData: async ({ store }) => {
          try {
            return await store
              .dispatch(
                generatedApi.endpoints.postLeaderboardByTeamName.initiate({
                  teamName,
                  leaderboardRequest: { ratingFieldName: 'score', cursor: 0, limit: 10 },
                }),
              )
              .unwrap();
          } catch (error) {
            console.log('Leaderboard preFetchData: Failed, will be handled on the client', error);
            return null;
          }
        },
      },
      { path: appRoutes.GAME, Component: withAuth(Game) },
      { path: appRoutes.ERROR, Component: ServerError },
      { path: appRoutes.NOT_FOUND, Component: NotFound },
    ],
  },
];
