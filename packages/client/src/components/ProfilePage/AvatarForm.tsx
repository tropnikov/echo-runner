import { FC } from 'react';

import { Avatar, Button, Flex, message, Typography, Upload } from 'antd';
import type { UploadProps } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';

import { useGetAuthUserQuery, usePutUserProfileAvatarMutation } from '@/api/generated';

const validateAvatarFile = (file: File): boolean => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('Можно загружать только JPG/PNG файлы!');
    return false;
  }

  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Изображение должно быть меньше 2MB!');
    return false;
  }

  return true;
};

const AvatarForm: FC = () => {
  const { data: userData, isLoading } = useGetAuthUserQuery();
  const [putUserProfileAvatar, { isLoading: isUpdating }] = usePutUserProfileAvatarMutation();

  const handleAvatarChange: UploadProps['onChange'] = async (info) => {
    if (info.file.status === 'uploading') {
      return;
    }

    if (info.file.status === 'done') {
      try {
        const formData = new FormData();
        formData.append('avatar', info.file.originFileObj as Blob);

        await putUserProfileAvatar({
          body: formData as unknown as { avatar: Blob },
        }).unwrap();
        message.success('Аватар успешно обновлен');
      } catch (error) {
        message.error('Ошибка при обновлении аватара');
        console.error('Avatar update error:', error);
      }
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} ошибка загрузки файла`);
    }
  };

  const uploadProps: UploadProps = {
    name: 'avatar',
    onChange: handleAvatarChange,
    beforeUpload: validateAvatarFile,
    showUploadList: false,
    customRequest: ({ onSuccess }) => {
      // Отключаем автоматическую загрузку, используем только нашу логику
      if (onSuccess) {
        onSuccess('ok');
      }
    },
  };

  return (
    <Flex vertical align="center" style={{ marginBottom: 24, width: '100%' }}>
      <Flex vertical align="center" gap="middle" style={{ marginBottom: 16 }}>
        <Avatar size={100} src={userData?.avatar} icon={<UserOutlined />} />
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />} loading={isUpdating} disabled={isLoading}>
            Обновить аватар
          </Button>
        </Upload>
      </Flex>
      <Typography.Text type="secondary">Поддерживаются JPG и PNG файлы до 2MB</Typography.Text>
    </Flex>
  );
};

export default AvatarForm;
