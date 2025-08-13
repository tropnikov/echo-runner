import { FC, useCallback, useEffect, useState } from 'react';

import { Space } from 'antd';

import HeroBlock from '@/components/LeaderboardPage/HeroBlock';
import LeaderboardTable from '@/components/LeaderboardPage/LeaderboardTable';
import LoadMoreBlock from '@/components/LeaderboardPage/LoadMoreBlock';
import StatsBlock from '@/components/LeaderboardPage/StatsBlock';
import { LeaderboardRecord } from '@/components/LeaderboardPage/types';
import { useLeaderboard } from '@/hooks/useLeaderboard';

const LeaderboardPage: FC = () => {
  const { getAllRatings } = useLeaderboard();
  const [data, setData] = useState<LeaderboardRecord[]>([]);

  const updateRatings = useCallback(async () => {
    const response = await getAllRatings({ ratingFieldName: 'score', cursor: 0, limit: 10 });
    setData(
      response.map((item) => {
        return { key: item.data.user_id, player: item.data.login, score: item.data.score };
      }),
    );
  }, []);

  useEffect(() => {
    updateRatings();
  }, []);

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <HeroBlock onUpdate={updateRatings} />
      <StatsBlock />
      <LeaderboardTable data={data} />
      <LoadMoreBlock />
    </Space>
  );
};

export default LeaderboardPage;
