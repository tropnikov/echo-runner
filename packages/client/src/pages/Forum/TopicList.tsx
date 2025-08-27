import { useMemo, useState } from 'react';
import { Link } from 'react-router';

import { Button, Flex, Table, Typography } from 'antd';
import type { TableProps } from 'antd';
import { FileTwoTone, FolderTwoTone } from '@ant-design/icons';

import TopicModal from '@/components/Forum/TopicModal';
import { useTopicList } from '@/hooks/useTopicList';

const { Text, Title } = Typography;

interface DataType {
  key: string;
  topic: {
    id: number;
    title: string;
    author: string;
    created_at: Date;
  };
  count: number;
  last: {
    user: string;
    date: Date;
  };
}

const columns: TableProps<DataType>['columns'] = [
  {
    key: 'icon',
    width: 32,
    render: () => <FolderTwoTone twoToneColor="#eb2f96" style={{ fontSize: '32px' }} />,
  },
  {
    dataIndex: 'topic',
    render: (topic) => (
      <Flex vertical>
        <Link to={`${topic.id}`}>
          <Title level={4}>{topic.title}</Title>
        </Link>

        <Text>
          Автор {topic.author}, {topic.created_at}
        </Text>
      </Flex>
    ),
  },
  {
    dataIndex: 'count',
    width: 150,
    render: (count) => <Text>Комментариев: {count}</Text>,
  },
  {
    dataIndex: 'last',
    width: 150,
    render: (last) => (
      <Flex vertical>
        <Text>{last.user}</Text>
        <Text>{last.date}</Text>
      </Flex>
    ),
  },
];

// const data: DataType[] = [
//   {
//     key: '1',
//     topic: {
//       id: 1,
//       title: 'Правила игры',
//       author: 'Пупкин',
//       created_at: '03 мая 2025г.',
//     },
//     count: 26,
//     last: {
//       user: 'david',
//       date: '15 мая 2025',
//     },
//   },
//   {
//     key: '2',
//     topic: {
//       id: 2,
//       title: 'Управление игрой',
//       author: 'Тюлькин',
//       created_at: '03 февраля 2025г.',
//     },
//     count: 12,
//     last: {
//       user: 'john',
//       date: '25 марта 2025',
//     },
//   },
// ];

function TopicList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNumber] = useState(0);
  const [pageSize] = useState(10);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const { data } = useTopicList(pageNumber, pageSize);

  const topics: DataType[] = useMemo<DataType[]>(
    () =>
      data.map((item) => ({
        key: item.id.toString(),
        topic: {
          id: item.id,
          title: item.name,
          author: item.owner_id.toString(),
          created_at: item.create_date,
        },
        count: item.comment_count,
        last: {
          user: item.last.owner_id.toString(),
          date: item.last.create_date,
        },
      })),
    [data],
  );

  return (
    <Flex vertical>
      <Title level={2}>Форум игры</Title>
      <Table<DataType>
        columns={columns}
        dataSource={topics}
        showHeader={false}
        pagination={{
          showTotal: (total) => (
            <div>
              {`Всего тем: ${total}`}
              <Button type="primary" icon={<FileTwoTone />} onClick={openModal} style={{ marginLeft: 8 }}>
                Создать тему
              </Button>
              <TopicModal show={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
            </div>
          ),
        }}
      />
    </Flex>
  );
}

export default TopicList;
