import { ChangeEvent, useState } from 'react';

import { Flex, Input, Modal } from 'antd';

interface TopicModalProps {
  show: boolean;
  handleOk: (name: string, comment: string) => void;
  handleCancel: () => void;
}

function TopicModal({ handleOk, handleCancel, show }: TopicModalProps) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const onOk = () => {
    handleOk(name, comment);
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <Modal title="Создание новой темы" open={show} onOk={onOk} onCancel={handleCancel}>
      <Flex vertical gap="middle">
        <Input id="topic_name" placeholder="Укажите название темы" onChange={onNameChange} />
        <Input.TextArea id="topic_comment" placeholder="Введите текст комментария" onChange={onCommentChange} />
      </Flex>
    </Modal>
  );
}

export default TopicModal;
