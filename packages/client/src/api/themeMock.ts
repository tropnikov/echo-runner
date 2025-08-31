import { Theme } from '@/types/themes';

const userThemes: Record<number, Theme> = {};

export const themeMock = {
  setTheme: (userId: number, theme: Theme) => {
    console.log('setTheme', userId, theme);
    userThemes[userId] = theme;
    return theme;
  },
  getTheme: (userId: number) => {
    console.log('getTheme', userId);
    return userThemes[userId] ?? 'light';
  },
};
