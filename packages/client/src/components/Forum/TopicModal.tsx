import { ChangeEvent, useState } from 'react'
import { Modal, Input, Flex } from 'antd'

interface TopicModalProps {
  show: boolean
  handleOk: (name: string, comment: string) => void
  handleCancel: () => void
}

function TopicModal(props: TopicModalProps) {
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')

  const handleOk = () => {
    props.handleOk(name, comment)
  }

  const handleCancel = () => {
    props.handleCancel()
  }

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  return (
    <Modal
      title="Создание новой темы"
      open={props.show}
      onOk={handleOk}
      onCancel={handleCancel}>
      <Flex vertical gap="middle">
        <Input
          id="topic_name"
          placeholder="Укажите название темы"
          onChange={onNameChange}
        />
        <Input.TextArea
          id="topic_comment"
          placeholder="Введите текст комментария"
          onChange={onCommentChange}
        />
      </Flex>
    </Modal>
  )
}

export default TopicModal
