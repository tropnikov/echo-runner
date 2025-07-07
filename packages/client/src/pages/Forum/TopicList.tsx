import { useState } from 'react'
import { Table, Layout, Flex, Typography, Button } from 'antd'
import { FolderTwoTone, FileTwoTone } from '@ant-design/icons'
import TopicModal from '../../components/Forum/TopicModal'

import type { TableProps } from 'antd'

const { Content } = Layout
const { Text, Title, Link } = Typography

interface DataType {
  key: string
  topic: {
    id: number
    title: string
    author: string
    created_at: string
  }
  count: number
  last: {
    user: string
    date: string
  }
}

const columns: TableProps<DataType>['columns'] = [
  {
    key: 'icon',
    width: 32,
    render: () => (
      <FolderTwoTone twoToneColor="#eb2f96" style={{ fontSize: '32px' }} />
    ),
  },
  {
    dataIndex: 'topic',
    render: topic => (
      <Flex vertical>
        <Link href={`topics/${topic.id}`}>
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
    render: count => <Text>Комментариев: {count}</Text>,
  },
  {
    dataIndex: 'last',
    width: 150,
    render: last => (
      <Flex vertical>
        <Text>{last.user}</Text>
        <Text>{last.date}</Text>
      </Flex>
    ),
  },
]

const data: DataType[] = [
  {
    key: '1',
    topic: {
      id: 1,
      title: 'Правила игры',
      author: 'Пупкин',
      created_at: '03 мая 2025г.',
    },
    count: 26,
    last: {
      user: 'david',
      date: '15 мая 2025',
    },
  },
  {
    key: '2',
    topic: {
      id: 2,
      title: 'Управление игрой',
      author: 'Тюлькин',
      created_at: '03 февраля 2025г.',
    },
    count: 12,
    last: {
      user: 'john',
      date: '25 марта 2025',
    },
  },
]

function TopicList() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <Layout style={{ margin: '100px' }}>
      <Content>
        <Table<DataType>
          columns={columns}
          dataSource={data}
          showHeader={false}
          title={() => <Title level={2}>Форум игры</Title>}
          pagination={{
            showTotal: total => (
              <div>
                {`Всего тем: ${total}`}
                <Button
                  type="primary"
                  icon={<FileTwoTone />}
                  onClick={() => setIsModalOpen(true)}
                  style={{ marginLeft: 8 }}>
                  Создать тему
                </Button>
                <TopicModal
                  show={isModalOpen}
                  handleOk={handleOk}
                  handleCancel={handleCancel}
                />
              </div>
            ),
          }}
        />
      </Content>
    </Layout>
  )
}

export default TopicList
