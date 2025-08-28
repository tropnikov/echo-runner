import { useCallback, useState } from 'react';

import { useGetUserThemeQuery, useSetUserThemeMutation } from '@/api/themeApi';
import { useAppSelector } from '@/redux/store';
import { Theme } from '@/types/themes';

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id;

  const { data: themeData, isLoading: isLoadingTheme } = useGetUserThemeQuery(
    { userId: userId ?? 0 },
    { skip: !userId },
  );
  const [setUserTheme, { isLoading: isSettingTheme }] = useSetUserThemeMutation();

  if (themeData && themeData.theme !== currentTheme) {
    setCurrentTheme(themeData.theme);
  }

  const changeTheme = useCallback(
    async (newTheme: Theme) => {
      setCurrentTheme(newTheme);

      if (!userId) return;

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
