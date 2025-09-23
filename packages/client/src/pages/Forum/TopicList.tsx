import { useMemo, useState } from 'react';
import { Link } from 'react-router';

import { Button, Flex, Table, Typography } from 'antd';
import type { TableProps } from 'antd';
import { FileTwoTone, FolderTwoTone } from '@ant-design/icons';

import { topicApi } from '@/api/apiForum';
import TopicModal from '@/components/Forum/TopicModal';
import { formatDate } from '@/helpers/dateformat';
import { useTopicList } from '@/hooks/useTopicList';
import { Topic } from '@/types/Forum';

import { withMeta } from '@/hocs/withMeta';

const { Text, Title } = Typography;

const columns: TableProps<Topic>['columns'] = [
  {
    key: 'icon',
    width: 32,
    render: () => <FolderTwoTone twoToneColor="#eb2f96" style={{ fontSize: '32px' }} />,
  },
  {
    dataIndex: 'topic',
    render: (topic) => (
      <Flex vertical>
        <Link to={`/topics/${topic.id}`}>
          <Title level={4} style={{ margin: 0 }}>
            {topic.title}
          </Title>
        </Link>
        <Text>
          Автор {topic.authorLogin}, {topic.created_at}
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
    render: (lastComment) => (
      <Flex vertical>
        <Text>{lastComment.authorLogin}</Text>
        <Text>{lastComment.created_at}</Text>
      </Flex>
    ),
  },
];

function TopicList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { topics, loadTopics, count } = useTopicList(pageNumber - 1, pageSize);

  const handleOk = async (name: string, comment: string) => {
    setIsModalOpen(false);
    try {
      const newTopic = await topicApi.createTopic(name);

      if (newTopic.id)
        await topicApi.createComment({
          text: comment,
          topicId: newTopic.id,
        });

      loadTopics();
    } catch (error) {
      console.error('Error creating topic:', error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const data: Topic[] = useMemo<Topic[]>(
    () =>
      topics.map((item) => ({
        key: item.id.toString(),
        topic: {
          id: item.id,
          title: item.name,
          authorId: item.ownerId,
          authorLogin: item.ownerLogin,
          created_at: formatDate(item?.createdAt),
        },
        count: item.commentsCount,
        last: {
          authorId: item.lastComment?.ownerId,
          authorLogin: item.lastComment?.ownerLogin,
          created_at: formatDate(item.lastComment?.createdAt),
        },
      })),
    [topics],
  );

  return (
    <Flex vertical>
      <Title level={2}>Форум игры</Title>
      <Table<Topic>
        columns={columns}
        dataSource={data}
        showHeader={false}
        pagination={{
          showTotal: (total) => `Всего тем: ${total}`,
          total: count,
          pageSize,
          current: pageNumber,
          onChange: (page, pageSize) => {
            setPageNumber(page);
            setPageSize(pageSize);
          },
        }}
      />
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Button type="primary" icon={<FileTwoTone />} onClick={openModal}>
          Создать тему
        </Button>
      </div>

      <TopicModal show={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
    </Flex>
  );
}

export default withMeta(TopicList, {
  title: 'Форум',
  description:
    'Форум Echo Runner. Обсуждайте игру, делитесь советами, задавайте вопросы и общайтесь с другими игроками.',
  keywords: 'форум, обсуждение, echo runner, игроки, советы, вопросы, темы',
  url: '/topics',
  noIndex: true,
});
