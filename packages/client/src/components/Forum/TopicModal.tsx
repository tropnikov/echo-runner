import { Form, Input, Modal } from 'antd';

interface TopicModalProps {
  show: boolean;
  handleOk: (name: string, comment: string) => void;
  handleCancel: () => void;
}

function TopicModal({ handleOk, handleCancel, show }: TopicModalProps) {
  const [form] = Form.useForm<{ name: string; comment: string }>();

  const onFinish = ({ name, comment }: { name: string; comment: string }) => {
    handleOk(name.trim(), comment.trim());
    form.resetFields();
  };

  const onCancel = () => {
    form.resetFields();
    handleCancel();
  };

  return (
    <Modal title="Создание новой темы" open={show} onOk={() => form.submit()} onCancel={onCancel}>
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ name: '', comment: '' }}>
        <Form.Item
          name="name"
          label="Название темы"
          rules={[{ required: true, whitespace: true, message: 'Укажите название темы' }]}>
          <Input id="topic_name" placeholder="Укажите название темы" />
        </Form.Item>

        <Form.Item
          name="comment"
          label="Первый комментарий"
          rules={[{ required: true, whitespace: true, message: 'Введите текст комментария' }]}>
          <Input.TextArea id="topic_comment" placeholder="Введите текст комментария" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default TopicModal;
