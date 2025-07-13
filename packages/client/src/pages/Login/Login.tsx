import { Navigate, useNavigate } from 'react-router';

import type { FormProps } from 'antd';
import { Button, Card, Flex, Form, Input, Typography } from 'antd';

import { useLazyGetAuthUserQuery, usePostAuthSigninMutation } from '@/api/generated';
import { appRoutes } from '@/constants/appRoutes';
import { useNotification } from '@/hooks/useNotification';
import { setUser } from '@/redux/slices/auth';
import { useAppDispatch, useAppSelector } from '@/redux/store';

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
        notification.success({
          message: 'Вход выполнен успешно',
        });
        navigate(`/${appRoutes.GAME}`);
      })
      .then(() => {
        getAuthUser()
          .unwrap()
          .then((userData) => {
            dispatch(setUser(userData));
          });
      })
      .catch((error) => {
        console.log(error);
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
          style={{ maxWidth: 400, width: '100%', flex: 1, alignSelf: 'center', marginTop: 16 }}
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
