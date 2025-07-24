import { Navigate, useNavigate } from 'react-router';

import type { FormProps } from 'antd';
import { Button, Card, Flex, Form, Input, Typography } from 'antd';

import { useLazyGetAuthUserQuery, usePostAuthSigninMutation } from '@/api/generated';
import { useNotification } from '@/components/NotificationProvider/NotificationProvider';
import { appRoutes } from '@/constants/appRoutes';
import { setUser } from '@/redux/slices/auth';
import { useAppDispatch, useAppSelector } from '@/redux/store';

import { rules } from '../../helpers/validators';

import styles from './Login.module.css';

type FieldType = {
  login: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const notification = useNotification();
  const dispatch = useAppDispatch();
  const { isAuthorised } = useAppSelector((state) => state.auth);

  const [auth, { isLoading }] = usePostAuthSigninMutation();
  const [getAuthUser] = useLazyGetAuthUserQuery();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    auth({
      signInRequest: values,
    })
      .unwrap()
      .then(() => {
        return getAuthUser().unwrap();
      })
      .then((userData) => {
        dispatch(setUser(userData));

        notification.success({
          message: 'Вход выполнен успешно',
        });

        navigate(`/${appRoutes.GAME}`);
      })
      .catch((error) => {
        console.log('Login failed:', error);

        notification.error({
          message: error.data?.reason ?? 'Произошла ошибка',
        });
      });
  };

  if (isAuthorised) {
    return <Navigate to={`/${appRoutes.GAME}`} replace />;
  }

  return (
    <Flex vertical justify="center" align="center" flex={1} className={styles.wrapper}>
      <Card title={<Typography.Title level={1}>Вход</Typography.Title>} className={styles.card}>
        <Form
          name="basic"
          className={styles.cardForm}
          initialValues={{ remember: true }}
          validateTrigger={['onChange', 'onBlur']}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical">
          <Form.Item<FieldType> label="Логин" name="login" rules={rules.login}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="Пароль" name="password" rules={rules.password}>
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
