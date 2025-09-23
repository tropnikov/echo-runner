import { useCallback } from 'react';

import {
  LeaderboardNewLeaderRequest,
  LeaderboardRequest,
  usePostLeaderboardByTeamNameMutation,
  usePostLeaderboardMutation,
} from '@/api/generated';
import { teamName } from '@/constants/leaderboardStats';

export interface GetAllRatingsResponse {
  data: {
    user_id: number;
    login: string;
    score: number;
  };
}

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
