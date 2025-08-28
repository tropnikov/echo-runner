import ErrorPage from '@/components/ErrorPage/ErrorPage';

import { withMeta } from '@/hocs/withMeta';

function ServerError() {
  return <ErrorPage title="500" text="Ведутся технические работы" />;
}

export default withMeta(ServerError, {
  title: '500 - Ошибка сервера',
  description: 'Временные технические неполадки. Мы работаем над устранением проблемы. Попробуйте позже.',
  noIndex: true,
});
