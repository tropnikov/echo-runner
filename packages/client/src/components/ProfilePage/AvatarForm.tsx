import { FC } from 'react';

import { Button, Flex, Typography, Upload } from 'antd';
import type { UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import type { UploadRequestOption } from 'rc-upload/lib/interface';

import { usePutUserProfileAvatarMutation } from '@/api/generated';
import { useNotification } from '@/components/NotificationProvider/NotificationProvider';
import { setUser } from '@/redux/slices/auth';
import { useAppDispatch, useAppSelector } from '@/redux/store';

import { UserAvatar } from './UserAvatar';

const AvatarForm: FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const notification = useNotification();
  const [putUserProfileAvatar, { isLoading }] = usePutUserProfileAvatarMutation();

  const validateAvatarFile = (file: File): boolean => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      notification.error({ message: 'Можно загружать только JPG/PNG файлы!' });
      return false;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      notification.error({ message: 'Изображение должно быть меньше 2MB!' });
      return false;
    }

    return true;
  };

  const customRequestAvatarUpload = async (options: UploadRequestOption) => {
    const { file, onSuccess, onError } = options;
    if (!(file instanceof Blob)) {
      notification.error({ message: 'Ошибка: файл не является изображением.' });
      if (onError) onError(new Error('Файл не является изображением.'));
      return;
    }
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await putUserProfileAvatar({
        body: formData as unknown as { avatar: Blob },
      }).unwrap();

      dispatch(setUser(response));
      notification.success({ message: 'Аватар успешно обновлен' });
      if (onSuccess) onSuccess('ok');
    } catch (error) {
      notification.error({ message: 'Ошибка при обновлении аватара' });
      if (onError) onError(error as Error);
    }
  };

  const uploadProps: UploadProps = {
    name: 'avatar',
    beforeUpload: validateAvatarFile,
    showUploadList: false,
    customRequest: customRequestAvatarUpload,
  };

  return (
    <Flex vertical align="center" style={{ marginBottom: 24, width: '100%' }}>
      <Flex vertical align="center" gap="middle" style={{ marginBottom: 16 }}>
        <UserAvatar avatarUrl={user?.avatar} />
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />} loading={isLoading} disabled={isLoading}>
            Обновить аватар
          </Button>
        </Upload>
      </Flex>
      <Typography.Text type="secondary">Поддерживаются JPG и PNG файлы до 2MB</Typography.Text>
    </Flex>
  );
};

export default AvatarForm;
