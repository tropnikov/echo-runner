import { FC } from 'react';

import { Avatar, Flex, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import type { Player } from './LeaderboardTable';

interface PlayerProps {
  player: Player;
}

const LeaderboardTablePlayer: FC<PlayerProps> = ({ player }) => {
  return (
    <Flex align="center" gap={16}>
      <Avatar icon={<UserOutlined />} size={48} />
      <Flex vertical gap={4}>
        <Typography.Text strong style={{ fontSize: 16 }}>
          {player.name}
        </Typography.Text>
        <Flex align="center" gap={8}>
          <Typography.Text type="secondary">Уровень {player.level}</Typography.Text>
          <Typography.Text type="secondary">•</Typography.Text>
          <Typography.Text type="secondary">Сыграно {player.gamesPlayed} раз</Typography.Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LeaderboardTablePlayer;
