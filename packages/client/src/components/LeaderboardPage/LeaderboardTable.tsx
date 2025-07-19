import { FC } from 'react';

import { Avatar, Flex, Table, Typography } from 'antd';

import SectionHeader from '@/components/MainPage/SectionHeader';
import { leaderboardRecords } from '@/constants/leaderboardRecords';

import LeaderboardTableBadge from './LeaderboardTableBadge';
import LeaderboardTablePlayer from './LeaderboardTablePlayer';

export interface Player {
  name: string;
  level: number;
  lastPlayed: string;
  gamesPlayed: number;
  joinDate: string;
}

export interface LeaderboardRecord {
  key: number;
  rank: number;
  player: Player;
  score: number;
  level: number;
}

const LeaderboardTable: FC = () => {
  const data = leaderboardRecords;

  const columns = [
    {
      title: 'Ранг',
      dataIndex: 'rank',
      key: 'rank',
      render: (rank: number) => <Avatar size={40}>{rank}</Avatar>,
    },
    {
      title: 'Игрок',
      dataIndex: 'player',
      key: 'player',
      render: (player: Player) => <LeaderboardTablePlayer player={player} />,
    },
    {
      title: 'Счет',
      dataIndex: 'score',
      key: 'score',
      render: (score: number) => <Typography.Title level={3}>{score.toLocaleString()}</Typography.Title>,
    },
    {
      title: 'Уровень',
      dataIndex: 'level',
      key: 'level',
      render: (level: number) => <Typography.Title level={3}>{level}</Typography.Title>,
    },
    {
      title: 'Значок',
      key: 'badge',
      render: (record: LeaderboardRecord) => <LeaderboardTableBadge rank={record.rank} />,
    },
  ];

  return (
    <>
      <Flex gap={20} vertical>
        <SectionHeader title="Лучшие игроки" description="Рейтинг игр" />
        <Table dataSource={data} columns={columns} pagination={false} bordered={false} scroll={{ x: 'max-content' }} />
      </Flex>
    </>
  );
};

export default LeaderboardTable;
