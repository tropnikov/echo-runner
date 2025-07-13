import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';

import { usePutUserPasswordMutation } from '@/api/generated';

type FieldType = {
  oldPassword: string;
  newPassword: string;
};

const PasswordForm: React.FC = () => {
  const [putUserPassword, { isLoading }] = usePutUserPasswordMutation();
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      await putUserPassword({
        changePasswordRequest: {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
      }).unwrap();

      message.success('Пароль успешно изменен');
      form.resetFields();
    } catch (error) {
      message.error('Ошибка при изменении пароля. Проверьте правильность старого пароля.');
      console.error('Password change error:', error);
    }
  };

  return (
    <>
      <Form
        form={form}
        name="change-password"
        style={{ maxWidth: 400, width: '100%', flex: 1, alignSelf: 'center', marginTop: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical">
        <Form.Item<FieldType>
          label="Старый пароль"
          name="oldPassword"
          rules={[{ required: true, message: 'Введите старый пароль' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="Новый пароль"
          name="newPassword"
          rules={[
            { required: true, message: 'Введите новый пароль' },
            { min: 6, message: 'Пароль должен содержать минимум 6 символов' },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default PasswordForm;
