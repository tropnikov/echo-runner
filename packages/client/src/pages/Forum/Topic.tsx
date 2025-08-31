import { ChangeEvent, useMemo, useState } from 'react';
import { useParams } from 'react-router';

import { Button, Flex, Input, List, Typography } from 'antd';
import { FolderTwoTone } from '@ant-design/icons';

import { topicApi } from '@/api/apiForum';
import { formatDate } from '@/helpers/dateformat';
import { useComments } from '@/hooks/useComments';
import { useTopic } from '@/hooks/useTopic';
import { useAppSelector } from '@/redux/store';
import type { Comment, Topic } from '@/types/Forum';

import { withMeta } from '@/hocs/withMeta';

const { Text, Title } = Typography;

function TopicComment({ id, author, date, comment }: Comment) {
  return (
    <List.Item key={id}>
      <List.Item.Meta
        avatar={<FolderTwoTone twoToneColor="#eb2f96" style={{ fontSize: '64px' }} />}
        title={author}
        description={date}
      />
      {comment}
    </List.Item>
  );
}

function Topic() {
  const [comment, setComment] = useState('');
  const [comment_start, setCommentStart] = useState(1);
  const [size, setSize] = useState(4);
  const { topicId } = useParams();
  const user = useAppSelector((state) => state.auth.user);

  const onCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const onSendComment = async () => {
    if (topicId) {
      await topicApi.createComment({
        text: comment,
        ownerId: user!.id,
        ownerLogin: user!.login,
        topicId: Number(topicId),
      });
      loadComments();
    }
    setComment('');
  };

  const { topic } = useTopic(Number(topicId));
  const { comments, loadComments, count } = useComments(Number(topicId), comment_start - 1, size);

  const data: Comment[] = useMemo<Comment[]>(
    () =>
      comments.map((item) => ({
        id: item.id,
        comment: item.text,
        author: item.ownerLogin,
        date: formatDate(item.createdAt),
      })),
    [comments],
  );

  return (
    <Flex vertical>
      <Title level={2}>{topic.name}</Title>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          showTotal: (total) => `Всего комментариев: ${total}`,
          total: count,
          pageSize: size,
          current: comment_start,
          onChange: (page, pageSize) => {
            setCommentStart(page);
            setSize(pageSize);
          },
        }}
        dataSource={data}
        renderItem={(item) => (
          <TopicComment
            id={item.id}
            {...(<FolderTwoTone twoToneColor="#eb2f96" style={{ fontSize: '64px' }} />)}
            author={item.author}
            date={item.date}
            comment={item.comment}
          />
        )}
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

export default withMeta(Topic, {
  title: 'Правила игры | Форум',
  description: 'Обсуждение правил игры Echo Runner. Читайте комментарии, задавайте вопросы и участвуйте в дискуссии.',
  keywords: 'правила игры, echo runner, форум, комментарии, дискуссия',
  noIndex: true,
});
