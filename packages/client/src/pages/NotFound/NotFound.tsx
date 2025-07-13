import ErrorPage from '@/components/ErrorPage/ErrorPage';

export default function NotFound() {
  return <ErrorPage title="404" text="Страница не найдена" withBackButton />;
}
