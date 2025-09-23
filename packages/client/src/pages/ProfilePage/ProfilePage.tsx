import { FC } from 'react';

import { Divider, Flex, Typography } from 'antd';

import AvatarForm from '@/components/ProfilePage/AvatarForm';
import PasswordForm from '@/components/ProfilePage/PasswordForm';

import { withMeta } from '@/hocs/withMeta';

const ProfilePage: FC = () => {
  return (
    <Flex vertical justify="center" align="start" flex={1}>
      <Typography.Title level={1}>Профиль</Typography.Title>
      <Divider />

      <AvatarForm />
      <PasswordForm />
    </Flex>
  );
};

export default withMeta(ProfilePage, {
  title: 'Профиль',
  description: 'Управляйте своим профилем Echo Runner: изменяйте аватар, обновляйте пароль и настройки аккаунта.',
  keywords: 'профиль, настройки, аватар, пароль, echo runner, аккаунт',
  url: '/profile',
  noIndex: true,
});
