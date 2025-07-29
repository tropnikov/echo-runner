import { useMemo } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';

import { Button, Layout, Menu, Space, theme } from 'antd/lib';
import { LoginOutlined, LogoutOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';

import { useNotification } from '@/components/NotificationProvider/NotificationProvider';
import { appRoutes, protectedRoutes } from '@/constants/appRoutes';
import { useAuthCheck } from '@/hooks/useAuthCheck';
import { useLogout } from '@/hooks/useLogout';
import { useAppSelector } from '@/redux/store';
import { isErrorWithReason } from '@/types/errors';

import styles from './BaseLayout.module.css';

const { Header, Content, Footer } = Layout;

const { useToken } = theme;

const menuItems = [
  {
    key: appRoutes.GAME,
    path: appRoutes.GAME,
    label: <NavLink to={appRoutes.GAME}>Игра</NavLink>,
  },
  {
    key: appRoutes.TOPICS,
    path: appRoutes.TOPICS,
    label: <NavLink to={appRoutes.TOPICS}>Форум</NavLink>,
  },
  {
    key: appRoutes.LEADERBOARD,
    path: appRoutes.LEADERBOARD,
    label: <NavLink to={appRoutes.LEADERBOARD}>Лидерборд</NavLink>,
  },
];

function BaseLayout({ children }: { children: React.ReactNode }) {
  const {
    token: { colorBgContainer },
  } = useToken();

  const navigate = useNavigate();
  const location = useLocation();
  const notification = useNotification();
  const { user } = useAppSelector((state) => state.auth);
  const { isAuthorized, isLoading } = useAuthCheck();
  const { logout } = useLogout();

  const currentSelectedKey = useMemo(() => {
    const pathname = location.pathname;
    const currentPath = pathname === '/' ? '/' : pathname.replace(/^\//, '');

    const routeKey = Object.values(appRoutes).find((route) => route === currentPath);

    return routeKey ? [routeKey] : [];
  }, [location.pathname]);

  const currentMenuItems = useMemo(() => {
    return menuItems.filter((item) => {
      const isProtected = protectedRoutes.includes(item.path);
      return isAuthorized ? isProtected : !isProtected;
    });
  }, [isAuthorized]);

  const handleAuthClick = (action: string) => {
    navigate(`/${action}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate(appRoutes.MAIN);
    } catch (error) {
      notification.error({
        message: isErrorWithReason(error) ? error.data.reason : 'Произошла ошибка при выходе',
      });
    }
  };

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerContentLeft}>
            <div className={styles.headerLogo}>
              <NavLink to={appRoutes.MAIN} style={{ color: 'white' }}>
                Echo Runner
              </NavLink>
            </div>
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={currentSelectedKey}
              items={currentMenuItems}
              style={{ flex: 1, minWidth: 0, border: 'none' }}
            />
          </div>

          <Space className={styles.headerContentRight}>
            {isLoading ? (
              <div>Loading...</div> // Или другой индикатор загрузки
            ) : isAuthorized ? (
              <>
                <Button
                  variant="filled"
                  type="text"
                  icon={<UserOutlined />}
                  style={{ color: 'white' }}
                  onClick={() => handleAuthClick(appRoutes.PROFILE)}>
                  {user?.first_name}
                </Button>
                <Button variant="solid" color="danger" icon={<LogoutOutlined />} onClick={handleLogout}>
                  Выход
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="text"
                  icon={<LoginOutlined />}
                  style={{ color: 'white' }}
                  onClick={() => handleAuthClick(appRoutes.SIGNIN)}>
                  Вход
                </Button>
                <Button type="primary" icon={<UserAddOutlined />} onClick={() => handleAuthClick(appRoutes.SIGNUP)}>
                  Регистрация
                </Button>
              </>
            )}
          </Space>
        </div>
      </Header>

      <Content className={styles.layoutContainer} style={{ overflowY: 'auto' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 'calc(100vh - 129.5px)',
            padding: '24px',
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
          }}>
          {children}
        </div>
      </Content>

      <Footer
        style={{
          textAlign: 'center',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #1677FF',
        }}>
        © {new Date().getFullYear()} Created by Echo Team
      </Footer>
    </Layout>
  );
}

export default BaseLayout;
