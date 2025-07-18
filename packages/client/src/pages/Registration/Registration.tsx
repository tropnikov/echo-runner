import { FC } from 'react';

import { Button, Card, Form, Input, Typography } from 'antd';

import { rules } from '../../helpers/validators';

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

  const handleFinishFailed = (errorInfo: unknown) => {
    console.error('Ошибка валидации:', errorInfo);
  };

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <Typography.Title level={1}>Регистрация</Typography.Title>
        <Form form={form} layout="vertical" onFinish={handleFinish} onFinishFailed={handleFinishFailed}>
          <Form.Item name="first_name" label="Имя" rules={rules.first_name}>
            <Input />
          </Form.Item>

          <Form.Item name="second_name" label="Фамилия" rules={rules.second_name}>
            <Input />
          </Form.Item>

          <Form.Item name="login" label="Логин" rules={rules.login}>
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={rules.email}>
            <Input />
          </Form.Item>

          <Form.Item name="password" label="Пароль" rules={rules.password}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Подтвердите пароль"
            dependencies={['password']}
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

          <Form.Item name="phone" label="Телефон" rules={rules.phone}>
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
