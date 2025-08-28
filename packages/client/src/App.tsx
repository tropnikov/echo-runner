import { useEffect, useMemo } from 'react';
import { Outlet } from 'react-router';

import { ConfigProvider } from 'antd';

import BaseLayout from './components/BaseLayout/BaseLayout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { useTheme } from './hooks/useTheme';
import { darkTheme } from './themes/darkTheme';
import { lightTheme } from './themes/lightTheme';

function App() {
  const mockUserId = 1;
  const { currentTheme } = useTheme(mockUserId);

  const themeConfig = useMemo(() => (currentTheme === 'dark' ? darkTheme : lightTheme), [currentTheme]);

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);

  return (
    <ErrorBoundary>
      <ConfigProvider
        theme={{
          cssVar: true,
          ...themeConfig,
        }}>
        <BaseLayout>
          <Outlet />
        </BaseLayout>
      </ConfigProvider>
    </ErrorBoundary>
  );
}

export default App;
