import { FC } from 'react';

import { Avatar, Flex, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface PlayerProps {
  player: string;
}

const LeaderboardTablePlayer: FC<PlayerProps> = ({ player }) => {
  return (
    <Flex align="center" gap={16}>
      <Avatar icon={<UserOutlined />} size={48} />
      <Flex vertical gap={4}>
        <Typography.Text strong style={{ fontSize: 16 }}>
          {player}
        </Typography.Text>
        <Flex align="center" gap={8}>
          <Typography.Text type="secondary">Уровень 1</Typography.Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LeaderboardTablePlayer;
