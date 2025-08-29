import { ChangeEvent, useState } from 'react';

import { Button, Flex, Input, List, Typography } from 'antd';

//import { topicApi } from '@/api/apiForum';
import { useCommentList, useTopic } from '@/hooks/useTopic';
//import { useAppSelector } from '@/redux/store';
import type { Topic } from '@/types/Forum';

const { Text, Title } = Typography;

// const data = Array.from({ length: 23 }).map((_, i) => ({
//   id: i,
//   avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
//   author: 'John',
//   date: '15 мая 2025',
//   comment:
//     'Отличный раздел! Часто возникают спорные моменты в правилах. Хорошо, что здесь можно уточнить детали у опытных игроков.',
// }));

/*
function TopicComment({ id, avatar, author, date, comment }: Comment ) {
  return (
    <List.Item key={id}>
      <List.Item.Meta avatar={<Avatar src={avatar} />} title={author} description={date} />
      {comment}
    </List.Item>
  );
}*/

function Topic() {
  const [comment, setComment] = useState('');
  const [comment_start, setCommentStart] = useState(0);
  const [size, setSize] = useState(10);
  const [id] = useState(0);
  const { comments } = useCommentList(/*id, comment_start, size*/);

  const onCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const onSendComment = async () => {
    setComment(comment);
    //const user = useAppSelector((state) => state.auth.user);
    /*
    const newComment = await topicApi.createComment({
      text: comment,
      ownerId: user!.id,
      ownerLogin: user!.login,
      topicId: id,
    });
*/
  };

  const { topic } = useTopic(id);

  // const data: Comment[] = useMemo<Comment[]>(
  //   () =>
  //     comments.map((item) => ({
  //       id: id.toString(),
  //       topic: {
  //         id: item.id,
  //         comment: item.text,
  //         author: item.ownerId.toString(),
  //         created_at: item.createdAt,
  //       },
  //     })),
  //   [data],
  // );

  return (
    <Flex vertical>
      <Title level={2}>{topic.name}</Title>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          showTotal: (total) => `Всего тем: ${total}`,
          pageSize: size,
          current: comment_start,
          onChange: (page, pageSize) => {
            setCommentStart(page);
            setSize(pageSize);
          },
        }}
        dataSource={comments}
        // renderItem={(item) => <TopicComment {...item} />}
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
