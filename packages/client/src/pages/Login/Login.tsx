import type { FormProps } from 'antd';
import { Button, Divider, Flex, Form, Input, Typography } from 'antd';

import { rules } from '../../helpers/validators';

type FieldType = {
  login: string;
  password: string;
};

const Login = () => {
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log(values);
  };

  return (
    <>
      <Flex vertical justify="center" align="start" flex={1}>
        <Typography.Title level={1}>Вход</Typography.Title>
        <Divider />
        <Form
          name="basic"
          style={{ maxWidth: 400, width: '100%', flex: 1, alignSelf: 'center', marginTop: 16 }}
          initialValues={{ remember: true }}
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
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </>
  );
};

export default Login;
