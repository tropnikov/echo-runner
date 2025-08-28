import { ChangeEvent, useState } from 'react';

import { Avatar, Button, Flex, Input, List, Typography } from 'antd';

import { useTopic } from '@/hooks/useTopic';
import { GetCommentResponse } from '@/types/Forum';

const { Text, Title } = Typography;

// const data = Array.from({ length: 23 }).map((_, i) => ({
//   id: i,
//   avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
//   author: 'John',
//   date: '15 мая 2025',
//   comment:
//     'Отличный раздел! Часто возникают спорные моменты в правилах. Хорошо, что здесь можно уточнить детали у опытных игроков.',
// }));

// interface TopicItemProps {
//   id: number;
//   avatar: string;
//   author: string;
//   date: string;
//   comment: string;
// }

// const topicItem: DataType[] = useMemo<DataType[]>(
//     () =>
//       data.map((item) => ({
//         key: item.id.toString(),
//         topic: {
//           id: item.id,
//           title: item.name,
//           author: item.owner_id.toString(),
//           created_at: item.create_date,
//         },
//         count: item.comment_count,
//         last: {
//           user: item.last.owner_id.toString(),
//           date: item.last.create_date,
//         },
//       })),
//     [data],
//   );

function TopicComment({ id, avatar, owner_login, create_date, text }: GetCommentResponse /*TopicItemProps*/) {
  return (
    <List.Item key={id}>
      <List.Item.Meta avatar={<Avatar src={avatar} />} title={owner_login} description={create_date.toDateString()} />
      {text}
    </List.Item>
  );
}

function Topic() {
  const [comment, setComment] = useState('');
  const [comment_start] = useState(0);
  const [size] = useState(10);
  const [id] = useState(0);

  const onCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const onSendComment = () => {
    setComment('');
  };

  const { topic } = useTopic(id, comment_start, size);

  return (
    <Flex vertical>
      <Title level={2}>{topic.name}</Title>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 4,
        }}
        dataSource={topic.comments}
        renderItem={(item) => <TopicComment {...item} />}
      />
      <Flex vertical gap="middle" style={{ padding: '16px' }}>
        <Text>Напишите комментарий</Text>
        <Input.TextArea id="topic_comment" value={comment} placeholder="Текст комментария" onChange={onCommentChange} />
        <Button style={{ width: 'fit-content', marginLeft: 'auto' }} onClick={onSendComment}>
          Отправить
        </Button>
      </Flex>
    </Flex>
  );
}

export default Topic;
