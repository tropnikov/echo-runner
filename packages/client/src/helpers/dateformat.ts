export const formatDate = (dateString?: string | Date | null): string => {
  if (!dateString) return '';

  const date = new Date(dateString);
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
