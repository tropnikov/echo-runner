import { useCallback } from 'react';

import {
  LeaderboardNewLeaderRequest,
  LeaderboardRequest,
  usePostLeaderboardByTeamNameMutation,
  usePostLeaderboardMutation,
} from '@/api/generated';

export const teamName = 'Echo-runner';

export const useLeaderboard = () => {
  const [leaderboardMutation] = usePostLeaderboardMutation();
  const [leaderboardAllMutation] = usePostLeaderboardByTeamNameMutation();

  const sendNewRating = useCallback(
    async (values: LeaderboardNewLeaderRequest) => {
      await leaderboardMutation({ leaderboardNewLeaderRequest: values }).unwrap();
    },
    [leaderboardMutation],
  );

  const getAllRatings = useCallback(
    async (values: LeaderboardRequest) => {
      const res = await leaderboardAllMutation({ teamName, leaderboardRequest: values }).unwrap();
      return res as GetAllRatingsResponse[];
    },
    [leaderboardAllMutation],
  );

  return { sendNewRating, getAllRatings };
};

interface GetAllRatingsResponse {
  data: {
    user_id: number;
    login: string;
    score: number;
  };
}
