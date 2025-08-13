import { FC } from 'react';

import { Avatar, Flex, Table, Typography } from 'antd';
import type { TableProps } from 'antd';

import SectionHeader from '@/components/MainPage/SectionHeader';

import LeaderboardTableBadge from './LeaderboardTableBadge';
import LeaderboardTablePlayer from './LeaderboardTablePlayer';
import { LeaderboardRecord, LeaderboardTableProps } from './types';

const LeaderboardTable: FC<LeaderboardTableProps> = ({ data }) => {
  const columns: TableProps<LeaderboardRecord>['columns'] = [
    {
      title: 'Ранг',
      key: 'rank',
      render: (value, record: LeaderboardRecord, index: number) => <Avatar size={40}>{index + 1}</Avatar>,
    },
    {
      title: 'Игрок',
      dataIndex: 'player',
      key: 'player',
      render: (player: string) => <LeaderboardTablePlayer player={player} />,
    },
    {
      title: 'Счет',
      dataIndex: 'score',
      key: 'score',
      render: (score: number) => <Typography.Title level={3}>{score.toLocaleString()}</Typography.Title>,
    },
    {
      title: 'Значок',
      key: 'badge',
      render: (value, record: LeaderboardRecord, index: number) => <LeaderboardTableBadge rank={index + 1} />,
    },
  ];

  return (
    <>
      <Flex gap={20} vertical>
        <SectionHeader title="Лучшие игроки" description="Рейтинг игр" />
        <Table<LeaderboardRecord>
          dataSource={data}
          columns={columns}
          pagination={false}
          bordered={false}
          scroll={{ x: 'max-content' }}
        />
      </Flex>
    </>
  );
};

export default LeaderboardTable;
