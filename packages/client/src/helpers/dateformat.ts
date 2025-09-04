export const formatDate = (input?: string | Date | null): string => {
  if (!input) return '';

  const date = new Date(input);
  if (isNaN(date.getTime())) return 'Неверная дата';

  const formatted = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);

  return formatted.replace(' г.', '').replace('.', '');
};
