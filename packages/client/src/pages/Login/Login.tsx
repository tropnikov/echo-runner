import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

import type { FormProps } from 'antd';
import { Button, Card, Flex, Form, Input, Typography } from 'antd';

import { SignInRequest } from '@/api/generated';
import { useNotification } from '@/components/NotificationProvider/NotificationProvider';
import { appRoutes } from '@/constants/appRoutes';
import { rules } from '@/helpers/validators';
import { useAuthCheck } from '@/hooks/useAuthCheck';
import { useLogin } from '@/hooks/useLogin';
import { useYandexOAuth } from '@/hooks/useYandexOAuth';
import { isErrorWithReason } from '@/types/errors';

import { withMeta } from '@/hocs/withMeta';

import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const notification = useNotification();
  const { login } = useLogin();
  const { startOAuthFlow } = useYandexOAuth();
  const { isAuthorized } = useAuthCheck();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish: FormProps<SignInRequest>['onFinish'] = async (values) => {
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
          validateTrigger="onBlur"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical">
          <Form.Item<SignInRequest> label="Логин" name="login" rules={rules.login}>
            <Input />
          </Form.Item>

          <Form.Item<SignInRequest> label="Пароль" name="password" rules={rules.password}>
            <Input.Password />
          </Form.Item>

          <Flex gap={16} vertical>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Войти
            </Button>
            <Button type="default" loading={isLoading} onClick={startOAuthFlow}>
              Войти через Яндекс ID
            </Button>
          </Flex>
        </Form>
      </Card>
    </Flex>
  );
};

export default withMeta(Login, {
  title: 'Вход',
  description: 'Войдите в свой аккаунт Echo Runner для доступа к игре, профилю и таблице лидеров.',
  keywords: 'вход, авторизация, логин, echo runner, аккаунт',
  url: '/signin',
  noIndex: true,
});
