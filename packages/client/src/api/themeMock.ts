import { Theme } from '@/types/Theme';

const userThemes: Record<number, Theme> = {};

export const themeMock = {
  setTheme: (userId: number, theme: Theme) => {
    userThemes[userId] = theme;
    return theme;
  },
  getTheme: (userId: number) => {
    return userThemes[userId] ?? 'light';
  },
};
