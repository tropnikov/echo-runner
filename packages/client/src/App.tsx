import { useEffect } from 'react';
import { Outlet } from 'react-router';

import { ConfigProvider, theme } from 'antd';

import BaseLayout from './components/BaseLayout/BaseLayout';

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
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}>
      <BaseLayout>
        <Outlet />
      </BaseLayout>
    </ConfigProvider>
  );
}

export default App;
