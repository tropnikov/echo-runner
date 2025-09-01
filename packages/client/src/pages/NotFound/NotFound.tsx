import ErrorPage from '@/components/ErrorPage/ErrorPage';

import { withMeta } from '@/hocs/withMeta';

function NotFound() {
  return <ErrorPage title="404" text="Страница не найдена" withBackButton />;
}

export default withMeta(NotFound, {
  title: '404 - Страница не найдена',
  description: 'Страница не найдена. Возможно, вы перешли по неверной ссылке или страница была перемещена.',
  noIndex: true,
});
