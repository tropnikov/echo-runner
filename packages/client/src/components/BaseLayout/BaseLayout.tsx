import { NavLink, useLocation, useNavigate } from 'react-router';

import { Button, Layout, Menu, Space, theme } from 'antd/lib';
import { LoginOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';

import { appRoutes } from '@/constants/appRoutes';

import styles from './BaseLayout.module.css';

const { Header, Content, Footer } = Layout;

const { useToken } = theme;

const menuItems = [
  {
    key: appRoutes.MAIN,
    path: appRoutes.MAIN,
    label: <NavLink to={appRoutes.MAIN}>Главная</NavLink>,
  },
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

  const handleAuthClick = (action: string) => {
    navigate(action);
  };

  const getCurrentKey = () => {
    const pathname = location.pathname;
    const currentPath = pathname === '/' ? '/' : pathname.replace(/^\//, '');

    const routeKey = Object.values(appRoutes).find((route) => route === currentPath);

    return routeKey ? [routeKey] : [];
  };

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerContentLeft}>
            <div className={styles.headerLogo}>Echo Runner</div>
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={getCurrentKey()}
              items={menuItems}
              style={{ flex: 1, minWidth: 0, border: 'none' }}
            />
          </div>

          <Space className={styles.headerContentRight}>
            {/* когда авторизован показывать профиль, когда нет – показывать кнопки входа и регистрации */}
            <Button
              type="text"
              icon={<UserOutlined />}
              style={{ color: 'white' }}
              onClick={() => handleAuthClick(appRoutes.PROFILE)}>
              Профиль
            </Button>

            {/* когда авторизован показывать профиль, когда нет – показывать кнопки входа и регистрации */}
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
