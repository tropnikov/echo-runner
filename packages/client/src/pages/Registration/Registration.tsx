import { FC, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

import { Button, Card, Flex, Form, FormProps, Input, Typography } from 'antd';

import { Helmet } from 'react-helmet-async';

import { SignUpRequest } from '@/api/generated';
import { useNotification } from '@/components/NotificationProvider/NotificationProvider';
import { appRoutes } from '@/constants/appRoutes';
import { title } from '@/constants/siteConfig';
import { getConfirmPasswordRule, rules } from '@/helpers/validators';
import { useAuthCheck } from '@/hooks/useAuthCheck';
import { useRegister } from '@/hooks/useRegister';
import { useYandexOAuth } from '@/hooks/useYandexOAuth';
import { isErrorWithReason } from '@/types/errors';

import styles from './registration.module.css';

const Registration: FC = () => {
  const [form] = Form.useForm();
  const { startOAuthFlow } = useYandexOAuth();
  const navigate = useNavigate();
  const notification = useNotification();
  const { register } = useRegister();
  const { isAuthorized } = useAuthCheck();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish: FormProps<SignUpRequest>['onFinish'] = async (values: SignUpRequest) => {
    setIsLoading(true);
    try {
      await register(values);
      notification.success({
        message: 'Регистрация прошла успешно',
      });
      navigate(`/${appRoutes.GAME}`);
    } catch (error) {
      console.log('Register failed:', error);
      notification.error({
        message: isErrorWithReason(error) ? error.data.reason : 'Произошла ошибка при регистрации',
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
        <title>Регистрация | {title}</title>
        <meta
          name="description"
          content="Создайте аккаунт Echo Runner, чтобы играть, соревноваться с другими игроками и отслеживать свои достижения."
        />
        <meta name="keywords" content="регистрация, создать аккаунт, echo runner, новый пользователь, присоединиться" />
        <meta property="og:title" content={`Регистрация | ${title}`} />
        <meta
          property="og:description"
          content="Создайте аккаунт Echo Runner, чтобы играть, соревноваться с другими игроками и отслеживать свои достижения."
        />
        <meta property="og:url" content="/signup" />
        <meta name="twitter:title" content={`Регистрация | ${title}`} />
        <meta
          name="twitter:description"
          content="Создайте аккаунт Echo Runner, чтобы играть, соревноваться с другими игроками и отслеживать свои достижения."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Flex vertical justify="center" align="center" flex={1} className={styles.wrapper}>
        <Card title={<Typography.Title level={1}>Регистрация</Typography.Title>} className={styles.card}>
          <Form
            name="basic"
            className={styles.cardForm}
            validateTrigger="onBlur"
            onFinish={onFinish}
            layout="vertical"
            form={form}>
            <Form.Item<SignUpRequest> name="first_name" label="Имя" rules={rules.first_name}>
              <Input />
            </Form.Item>

            <Form.Item<SignUpRequest> name="second_name" label="Фамилия" rules={rules.second_name}>
              <Input />
            </Form.Item>

            <Form.Item<SignUpRequest> name="login" label="Логин" rules={rules.login}>
              <Input />
            </Form.Item>

            <Form.Item<SignUpRequest> name="email" label="Email" rules={rules.email}>
              <Input />
            </Form.Item>

            <Form.Item<SignUpRequest> name="password" label="Пароль" rules={rules.password}>
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Подтвердите пароль"
              dependencies={['password']}
              rules={getConfirmPasswordRule(form)}>
              <Input.Password />
            </Form.Item>

            <Form.Item<SignUpRequest> name="phone" label="Телефон" rules={rules.phone}>
              <Input />
            </Form.Item>

            <Flex gap={16} vertical>
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Зарегистрироваться
                </Button>
              </Form.Item>
              <Button type="default" loading={isLoading} onClick={startOAuthFlow}>
                Зарегистрироваться через Яндекс ID
              </Button>
            </Flex>
          </Form>
        </Card>
      </Flex>
    </>
  );
};

export default Registration;
