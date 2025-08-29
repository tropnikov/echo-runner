import { /*useMemo,*/ useState } from 'react';
import { Link } from 'react-router';

import { Button, Flex, Table, Typography } from 'antd';
import type { TableProps } from 'antd';
import { FileTwoTone, FolderTwoTone } from '@ant-design/icons';

//import { topicApi } from '@/api/apiForum';
import TopicModal from '@/components/Forum/TopicModal';
import { useTopicList } from '@/hooks/useTopicList';
//import { useAppSelector } from '@/redux/store';
import { Topic } from '@/types/Forum';

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

function TopicList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading] = useState(true);

  const { topics /*, loadTopics*/ } = useTopicList(pageNumber, pageSize);

  const handleOk = async (/*name: string , comment: string*/) => {
    setIsModalOpen(false);
    /*
    try {
      const user = useAppSelector((state) => state.auth.user);
      const newTopic = await topicApi.createTopic({
        name,
        ownerId: user!.id,
        ownerLogin: user!.login,
      });

      console.log('new_topic:', newTopic);

      if (newTopic.id) {
        const newComment = await topicApi.createComment({
          text: name,
          ownerId: user!.id,
          ownerLogin: user!.login,
          topicId: newTopic.id,
        });
      }

      console.log('new_comment:', newTopic);

      loadTopics(pageNumber, pageSize);
    } catch (error) {
      console.error('Error creating topic:', error);
    }
*/
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  // const data: Topic[] = useMemo<Topic[]>(
  //   () =>
  //     topics.map((item) => ({
  //       key: item.id.toString(),
  //       topic: {
  //         id: item.id,
  //         title: item.name,
  //         author: item.owner_id.toString(),
  //         created_at: item.create_date,
  //       },
  //       count: item.comments_count,
  //       last: {
  //         user: item.last.owner_login.toString(),
  //         date: item.last.create_date,
  //       },
  //     })),
  //   [topics],
  // );

  if (loading) return <div>Loading...</div>;

  return (
    <Flex vertical>
      <Title level={2}>Форум игры</Title>
      <Table<Topic>
        columns={columns}
        //        dataSource={data}
        showHeader={false}
        pagination={{
          showTotal: (total) => `Всего тем: ${total}`,
          pageSize,
          current: pageNumber,
          onChange: (page, pageSize) => {
            setPageNumber(page);
            setPageSize(pageSize);
          },
        }}
      />
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <span>{`Всего тем: ${topics.length}`}</span>
        <Button type="primary" icon={<FileTwoTone />} onClick={openModal}>
          Создать тему
        </Button>
      </div>

      <TopicModal show={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
    </Flex>
  );
}

export default TopicList;
