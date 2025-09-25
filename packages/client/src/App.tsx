import { Outlet } from 'react-router';

import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';

import { Helmet } from 'react-helmet-async';

import BaseLayout from './components/BaseLayout/BaseLayout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { title } from './constants/siteConfig';
import { useTheme } from './hooks/useTheme';
import { darkTheme } from './themes/darkTheme';
import { lightTheme } from './themes/lightTheme';

const THEMES = {
  dark: darkTheme,
  light: lightTheme,
} as const;

function App() {
  const { currentTheme } = useTheme();
  const themeConfig = THEMES[currentTheme];

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
        locale={ruRU}
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
