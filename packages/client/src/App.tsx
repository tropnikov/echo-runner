import { useEffect } from 'react';
import { Outlet } from 'react-router';

import { ConfigProvider, theme } from 'antd';

import { Helmet } from 'react-helmet-async';

import BaseLayout from './components/BaseLayout/BaseLayout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { title } from './constants/siteConfig';

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
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Echo Runner - увлекательная игра-платформер с соревновательными элементами" />
        <meta name="keywords" content="игра, платформер, echo runner, соревнования, лидерборд" />
        <meta name="author" content="Echo Runner Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#1890ff" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={title} />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content="Echo Runner - увлекательная игра-платформер с соревновательными элементами"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta
          name="twitter:description"
          content="Echo Runner - увлекательная игра-платформер с соревновательными элементами"
        />
      </Helmet>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
        }}>
        <BaseLayout>
          <Outlet />
        </BaseLayout>
      </ConfigProvider>
    </ErrorBoundary>
  );
}

export default App;
