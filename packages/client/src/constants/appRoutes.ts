export const appRoutes = {
  MAIN: '/',
  TOPICS: 'topics',
  TOPIC: ':topicId',
  SIGNIN: 'signin',
  SIGNUP: 'signup',
  PROFILE: 'profile',
  LEADERBOARD: 'leaderboard',
  GAME: 'game',
  ERROR: 'error',
  NOT_FOUND: '*',
};

export const protectedRoutes = [appRoutes.TOPICS, appRoutes.PROFILE, appRoutes.LEADERBOARD, appRoutes.GAME];
