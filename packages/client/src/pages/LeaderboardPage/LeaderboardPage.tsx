import { FC } from 'react';

import { Space } from 'antd';

import HeroBlock from '@/components/LeaderboardPage/HeroBlock';
import LeaderboardTable from '@/components/LeaderboardPage/LeaderboardTable';
import LoadMoreBlock from '@/components/LeaderboardPage/LoadMoreBlock';
import StatsBlock from '@/components/LeaderboardPage/StatsBlock';

const LeaderboardPage: FC = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <HeroBlock />
      <StatsBlock />
      <LeaderboardTable />
      <LoadMoreBlock />
    </Space>
  );
};

export default LeaderboardPage;
