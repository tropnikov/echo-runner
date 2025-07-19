import { FC } from 'react';

import { Flex } from 'antd';
import { StarOutlined, TrophyOutlined } from '@ant-design/icons';

interface BadgeProps {
  rank: number;
}

const LeaderboardTableBadge: FC<BadgeProps> = ({ rank }) => {
  const getRankBadge = (rank: number) => {
    if (rank === 1) return { icon: <TrophyOutlined />, color: '#FFD700' };
    if (rank === 2) return { icon: <TrophyOutlined />, color: '#C0C0C0' };
    if (rank === 3) return { icon: <TrophyOutlined />, color: '#CD7F32' };

    return { icon: <StarOutlined />, color: '#8B8B8B' };
  };

  const rankBadge = getRankBadge(rank);

  return (
    <Flex align="center" gap={8}>
      <span style={{ color: rankBadge.color, fontSize: 32 }}>{rankBadge.icon}</span>
    </Flex>
  );
};

export default LeaderboardTableBadge;
