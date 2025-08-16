import { FC, useCallback, useEffect, useState } from 'react';

import { Space } from 'antd';

import HeroBlock from '@/components/LeaderboardPage/HeroBlock';
import LeaderboardTable from '@/components/LeaderboardPage/LeaderboardTable';
import LoadMoreBlock from '@/components/LeaderboardPage/LoadMoreBlock';
import { LeaderboardRecord } from '@/components/LeaderboardPage/types';
import { useLeaderboard } from '@/hooks/useLeaderboard';

const LeaderboardPage: FC = () => {
  const limitDelta = 10;

  const { getAllRatings } = useLeaderboard();
  const [data, setData] = useState<LeaderboardRecord[]>([]);
  const [limit, setLimit] = useState<number>(limitDelta);
  const [showLoadMore, setShowLoadMore] = useState<boolean>(true);

  const updateRatings = useCallback(async () => {
    const response = await getAllRatings({ ratingFieldName: 'score', cursor: 0, limit });
    setShowLoadMore(response.length == limit);
    setData(
      response.map((item) => {
        return { key: item.data.user_id, player: item.data.login, score: item.data.score };
      }),
    );
  }, [getAllRatings, limit]);

  useEffect(() => {
    updateRatings();
  }, [limit]);

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <HeroBlock onUpdate={updateRatings} />
      <LeaderboardTable data={data} />
      {showLoadMore && (
        <LoadMoreBlock
          onLoadMore={() => {
            setLimit((l) => l + limitDelta);
          }}
        />
      )}
    </Space>
  );
};

export default LeaderboardPage;
