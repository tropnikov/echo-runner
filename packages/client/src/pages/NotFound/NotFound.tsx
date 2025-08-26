import { Helmet } from 'react-helmet-async';

import ErrorPage from '@/components/ErrorPage/ErrorPage';
import { title } from '@/constants/siteConfig';

function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - Страница не найдена | {title}</title>
        <meta
          name="description"
          content="Страница не найдена. Возможно, вы перешли по неверной ссылке или страница была перемещена."
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content={`404 - Страница не найдена | ${title}`} />
        <meta
          property="og:description"
          content="Страница не найдена. Возможно, вы перешли по неверной ссылке или страница была перемещена."
        />
        <meta name="twitter:title" content={`404 - Страница не найдена | ${title}`} />
        <meta
          name="twitter:description"
          content="Страница не найдена. Возможно, вы перешли по неверной ссылке или страница была перемещена."
        />
      </Helmet>
      <ErrorPage title="404" text="Страница не найдена" withBackButton description="Страница не найдена" />
    </>
  );
}

export default NotFound;
