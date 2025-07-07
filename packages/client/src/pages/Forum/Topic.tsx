import { ChangeEvent, useState } from 'react'
import { Layout, Flex, Typography, Input, Button } from 'antd'

const { Content } = Layout
const { Text, Title } = Typography

import { Avatar, List } from 'antd'

const data = Array.from({ length: 23 }).map((_, i) => ({
  id: i,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  author: 'John',
  date: '15 мая 2025',
  comment:
    'Отличный раздел! Часто возникают спорные моменты в правилах. Хорошо, что здесь можно уточнить детали у опытных игроков.',
}))

interface TopicItemProps {
  id: number
  avatar: string
  author: string
  date: string
  comment: string
}

function Topic() {
  const [comment, setComment] = useState('')

  const onCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  const onSendComment = () => {
    setComment('')
  }

  return (
    <Layout>
      <Content>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 4,
          }}
          dataSource={data}
          header={<Title level={2}>Правила игры</Title>}
          renderItem={item => <TopicItem {...item} />}
        />
        <Flex vertical gap="middle">
          <Text>Напишите комментарий</Text>
          <Input.TextArea
            id="topic_comment"
            value={comment}
            placeholder="Текст комментария"
            onChange={onCommentChange}
          />
          <Button
            style={{ width: 'fit-content', marginLeft: 'auto' }}
            onClick={onSendComment}>
            Отправить
          </Button>
        </Flex>
      </Content>
    </Layout>
  )
}

function TopicItem(props: TopicItemProps) {
  const { id, avatar, author, date, comment } = props

  return (
    <List.Item key={id}>
      <List.Item.Meta
        avatar={<Avatar src={avatar} />}
        title={author}
        description={date}
      />
      {comment}
    </List.Item>
  )
}
export default Topic
