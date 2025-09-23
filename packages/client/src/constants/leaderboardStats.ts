export interface StatItem {
  title: string;
  value: number | string;
}

export const leaderboardStats: StatItem[] = [
  {
    title: 'Всего игроков',
    value: 456,
  },
  {
    title: 'Сыграно игр',
    value: 234,
  },
  {
    title: 'Лучший результат',
    value: '156,890',
  },
  {
    title: 'Активных пользователей',
    value: 123,
  },
];

export const teamName = 'Echo-runner';
