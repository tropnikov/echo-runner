import ErrorPage from '@/components/ErrorPage/ErrorPage';

function NotFound() {
  return <ErrorPage title="404" text="Страница не найдена" withBackButton />;
}

export default NotFound;
