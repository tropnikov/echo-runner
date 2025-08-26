import { FC } from 'react';

import { Divider, Flex, Typography } from 'antd';

import { Helmet } from 'react-helmet-async';

import AvatarForm from '@/components/ProfilePage/AvatarForm';
import PasswordForm from '@/components/ProfilePage/PasswordForm';
import { title } from '@/constants/siteConfig';

const ProfilePage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Профиль | {title}</title>
        <meta
          name="description"
          content="Управляйте своим профилем Echo Runner: изменяйте аватар, обновляйте пароль и настройки аккаунта."
        />
        <meta name="keywords" content="профиль, настройки, аватар, пароль, echo runner, аккаунт" />
        <meta property="og:title" content={`Профиль | ${title}`} />
        <meta
          property="og:description"
          content="Управляйте своим профилем Echo Runner: изменяйте аватар, обновляйте пароль и настройки аккаунта."
        />
        <meta property="og:url" content="/profile" />
        <meta name="twitter:title" content={`Профиль | ${title}`} />
        <meta
          name="twitter:description"
          content="Управляйте своим профилем Echo Runner: изменяйте аватар, обновляйте пароль и настройки аккаунта."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
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
