import { FC } from 'react';

import { Divider, Flex, Typography } from 'antd';

import AvatarForm from '@/components/ProfilePage/AvatarForm';
import PasswordForm from '@/components/ProfilePage/PasswordForm';

const ProfilePage: FC = () => {
  return (
    <>
      <Flex vertical justify="center" align="start" flex={1}>
        <Typography.Title level={1}>Профиль</Typography.Title>
        <Divider />

        <AvatarForm />
        <PasswordForm />
      </Flex>
    </>
  );
};

export default ProfilePage;
