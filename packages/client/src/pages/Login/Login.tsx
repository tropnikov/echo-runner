import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

import type { FormProps } from 'antd';
import { Button, Card, Flex, Form, Input, Typography } from 'antd';

import { useAuth } from '@/components/AuthProvider/AuthProvider';
import { useNotification } from '@/components/NotificationProvider/NotificationProvider';
import { appRoutes } from '@/constants/appRoutes';
import { isErrorWithReason } from '@/types/errors';

import styles from './Login.module.css';

type FieldType = {
  login: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const notification = useNotification();
  const { isAuthorized, login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setIsLoading(true);
    try {
      await login(values);
      notification.success({
        message: 'Вход выполнен успешно',
      });
      navigate(`/${appRoutes.GAME}`);
    } catch (error: unknown) {
      console.log('Login failed:', error);
      notification.error({
        message: isErrorWithReason(error) ? error.data.reason : 'Произошла ошибка при выходе',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthorized) {
    return <Navigate to={`/${appRoutes.GAME}`} replace />;
  }

  return (
    <Flex vertical justify="center" align="center" flex={1} className={styles.wrapper}>
      <Card title={<Typography.Title level={1}>Вход</Typography.Title>} className={styles.card}>
        <Form
          name="basic"
          className={styles.cardForm}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical">
          <Form.Item<FieldType> label="Логин" name="login" rules={[{ required: true, message: 'Введите логин' }]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="Пароль" name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
};

export default Login;
