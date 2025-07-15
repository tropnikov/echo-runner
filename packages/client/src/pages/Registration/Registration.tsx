import { FC } from 'react';

import { Button, Card, Form, Input, Typography } from 'antd';

import styles from './registration.module.css';

type FormData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  confirm?: string;
};

const Registration: FC = () => {
  const [form] = Form.useForm<FormData>();

  const handleFinish = (values: FormData) => {
    console.log('Данные регистрации:', values);
  };

  const handleFinishFailed = (errorInfo: any) => {
    console.error('Ошибка валидации:', errorInfo);
  };

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <Typography.Title level={1}>Регистрация</Typography.Title>
        <Form form={form} layout="vertical" onFinish={handleFinish} onFinishFailed={handleFinishFailed}>
          <Form.Item name="first_name" label="Имя" rules={[{ required: true, message: 'Введите имя' }]}>
            <Input />
          </Form.Item>

          <Form.Item name="second_name" label="Фамилия" rules={[{ required: true, message: 'Введите фамилию' }]}>
            <Input />
          </Form.Item>

          <Form.Item name="login" label="Логин" rules={[{ required: true, message: 'Введите логин' }]}>
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Введите email' }]}>
            <Input />
          </Form.Item>

          <Form.Item name="password" label="Пароль" rules={[{ required: true, message: 'Введите пароль' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Подтвердите пароль"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Подтвердите пароль' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают'));
                },
              }),
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Телефон"
            rules={[
              { required: true, message: 'Введите телефон' },
              { pattern: /^\+?\d{11,15}$/, message: 'Введите номер в формате +79123456789' },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Registration;
