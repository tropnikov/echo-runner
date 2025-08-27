import { useEffect } from 'react';
import { Outlet } from 'react-router';

import { ConfigProvider } from 'antd';

import BaseLayout from './components/BaseLayout/BaseLayout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { darkTheme } from './themes/darkTheme';

function App() {
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
          ...darkTheme,
        }}>
        <BaseLayout>
          <Outlet />
        </BaseLayout>
      </ConfigProvider>
    </ErrorBoundary>
  );
}

export default App;
