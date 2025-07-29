import { FC } from 'react';

import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';

import { usePutUserPasswordMutation } from '@/api/generated';
import { useNotification } from '@/components/NotificationProvider/NotificationProvider';
import { rules } from '@/helpers/validators';

type FieldType = {
  oldPassword: string;
  newPassword: string;
};

const PasswordForm: FC = () => {
  const [putUserPassword, { isLoading }] = usePutUserPasswordMutation();
  const [form] = Form.useForm();
  const notification = useNotification();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      await putUserPassword({
        changePasswordRequest: {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
      }).unwrap();

      notification.success({ message: 'Пароль успешно изменен' });
      form.resetFields();
    } catch (error) {
      notification.error({ message: 'Ошибка при изменении пароля. Проверьте правильность старого пароля.' });
      console.error('Password change error:', error);
    }
  };

  return (
    <>
      <Form
        form={form}
        name="change-password"
        style={{ maxWidth: 400, width: '100%', flex: 1, alignSelf: 'center', marginTop: 16 }}
        validateTrigger="onBlur"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical">
        <Form.Item<FieldType>
          label="Старый пароль"
          name="oldPassword"
          rules={[{ required: true, message: 'Введите старый пароль' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType> label="Новый пароль" name="newPassword" rules={rules.password}>
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
