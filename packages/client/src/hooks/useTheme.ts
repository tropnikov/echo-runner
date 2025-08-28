import { useCallback, useState } from 'react';

import { useGetUserThemeQuery, useSetUserThemeMutation } from '@/api/themeApi';
import { Theme } from '@/types/Theme';

export const useTheme = (userId: number) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');
  const { data: themeData, isLoading: isLoadingTheme } = useGetUserThemeQuery({ userId });
  const [setUserTheme, { isLoading: isSettingTheme }] = useSetUserThemeMutation();

  if (themeData && themeData.theme !== currentTheme) {
    setCurrentTheme(themeData.theme);
  }

  const changeTheme = useCallback(
    async (newTheme: Theme) => {
      setCurrentTheme(newTheme);

      try {
        await setUserTheme({ userId, theme: newTheme });
      } catch (error) {
        throw new Error(`Failed to set theme${error instanceof Error ? `: ${error.message}` : ''}`);
      }
    },
    [userId, setUserTheme],
  );

  const switchTheme = useCallback(() => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    changeTheme(newTheme);
  }, [changeTheme, currentTheme]);

  return {
    currentTheme,
    isLoading: isLoadingTheme || isSettingTheme,
    changeTheme,
    switchTheme,
  };
};
