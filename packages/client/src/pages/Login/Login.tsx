import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

import type { FormProps } from 'antd';
import { Button, Card, Flex, Form, Input, Typography } from 'antd';

import { Helmet } from 'react-helmet-async';

import { SignInRequest } from '@/api/generated';
import { useNotification } from '@/components/NotificationProvider/NotificationProvider';
import { appRoutes } from '@/constants/appRoutes';
import { title } from '@/constants/siteConfig';
import { rules } from '@/helpers/validators';
import { useAuthCheck } from '@/hooks/useAuthCheck';
import { useLogin } from '@/hooks/useLogin';
import { isErrorWithReason } from '@/types/errors';

import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const notification = useNotification();
  const { login } = useLogin();
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
    <>
      <Helmet>
        <title>Вход | {title}</title>
        <meta
          name="description"
          content="Войдите в свой аккаунт Echo Runner для доступа к игре, профилю и таблице лидеров."
        />
        <meta name="keywords" content="вход, авторизация, логин, echo runner, аккаунт" />
        <meta property="og:title" content={`Вход | ${title}`} />
        <meta
          property="og:description"
          content="Войдите в свой аккаунт Echo Runner для доступа к игре, профилю и таблице лидеров."
        />
        <meta property="og:url" content="/signin" />
        <meta name="twitter:title" content={`Вход | ${title}`} />
        <meta
          name="twitter:description"
          content="Войдите в свой аккаунт Echo Runner для доступа к игре, профилю и таблице лидеров."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
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

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Войти
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </>
  );
};

export default Login;
