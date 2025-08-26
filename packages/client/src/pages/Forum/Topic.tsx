import { ChangeEvent, useState } from 'react';

import { Avatar, Button, Flex, Input, List, Typography } from 'antd';

import { Helmet } from 'react-helmet-async';

import { title } from '@/constants/siteConfig';

const { Text, Title } = Typography;

const data = Array.from({ length: 23 }).map((_, i) => ({
  id: i,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  author: 'John',
  date: '15 мая 2025',
  comment:
    'Отличный раздел! Часто возникают спорные моменты в правилах. Хорошо, что здесь можно уточнить детали у опытных игроков.',
}));

interface TopicItemProps {
  id: number;
  avatar: string;
  author: string;
  date: string;
  comment: string;
}

function TopicItem({ id, avatar, author, date, comment }: TopicItemProps) {
  return (
    <List.Item key={id}>
      <List.Item.Meta avatar={<Avatar src={avatar} />} title={author} description={date} />
      {comment}
    </List.Item>
  );
}

function Topic() {
  const [comment, setComment] = useState('');

  const onCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const onSendComment = () => {
    setComment('');
  };

  return (
    <>
      <Helmet>
        <title>Правила игры | Форум | {title}</title>
        <meta
          name="description"
          content="Обсуждение правил игры Echo Runner. Читайте комментарии, задавайте вопросы и участвуйте в дискуссии."
        />
        <meta name="keywords" content="правила игры, echo runner, форум, комментарии, дискуссия" />
        <meta property="og:title" content={`Правила игры | Форум | ${title}`} />
        <meta
          property="og:description"
          content="Обсуждение правил игры Echo Runner. Читайте комментарии, задавайте вопросы и участвуйте в дискуссии."
        />
        <meta name="twitter:title" content={`Правила игры | Форум | ${title}`} />
        <meta
          name="twitter:description"
          content="Обсуждение правил игры Echo Runner. Читайте комментарии, задавайте вопросы и участвуйте в дискуссии."
        />
      </Helmet>
      <Flex vertical>
        <Title level={2}>Правила игры</Title>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 4,
          }}
          dataSource={data}
          renderItem={(item) => <TopicItem {...item} />}
        />
        <Flex vertical gap="middle" style={{ padding: '16px' }}>
          <Text>Напишите комментарий</Text>
          <Input.TextArea
            id="topic_comment"
            value={comment}
            placeholder="Текст комментария"
            onChange={onCommentChange}
          />
          <Button style={{ width: 'fit-content', marginLeft: 'auto' }} onClick={onSendComment}>
            Отправить
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

export default Topic;
