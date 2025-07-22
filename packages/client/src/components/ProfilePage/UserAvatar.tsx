import { FC, useState } from 'react';

import { Avatar, Skeleton } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { baseUrl } from '@/constants/apiEndpoint';

import styles from './UserAvatar.module.css';

interface UserAvatarProps {
  avatarUrl: string | null | undefined;
  size?: number;
}

export const UserAvatar: FC<UserAvatarProps> = ({ avatarUrl, size = 100 }) => {
  const [avatarLoading, setAvatarLoading] = useState(true);

  if (!avatarUrl) {
    return <Avatar size={size} icon={<UserOutlined />} />;
  }

  return (
    <>
      {avatarLoading && <Skeleton.Avatar active size={size} shape="circle" />}
      <Avatar
        size={size}
        src={
          <img
            src={`${baseUrl}/resources${avatarUrl}`}
            style={{ display: avatarLoading ? 'none' : 'block' }}
            onLoad={() => setAvatarLoading(false)}
            alt="avatar"
          />
        }
        icon={<UserOutlined />}
        className={avatarLoading ? styles.hidden : ''}
      />
    </>
  );
};
