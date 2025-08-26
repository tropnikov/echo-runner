import { Helmet } from 'react-helmet-async';

import ErrorPage from '@/components/ErrorPage/ErrorPage';
import { title } from '@/constants/siteConfig';

function ServerError() {
  return (
    <>
      <Helmet>
        <title>500 - Ошибка сервера | {title}</title>
        <meta
          name="description"
          content="Временные технические неполадки. Мы работаем над устранением проблемы. Попробуйте позже."
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content={`500 - Ошибка сервера | ${title}`} />
        <meta
          property="og:description"
          content="Временные технические неполадки. Мы работаем над устранением проблемы."
        />
        <meta name="twitter:title" content={`500 - Ошибка сервера | ${title}`} />
        <meta
          name="twitter:description"
          content="Временные технические неполадки. Мы работаем над устранением проблемы."
        />
      </Helmet>
      <ErrorPage title="500" text="Ведутся технические работы" description="Ведутся технические работы" />
    </>
  );
}

export default ServerError;
