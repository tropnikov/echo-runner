import { useCallback, useEffect, useState } from 'react';

import { useGetUserThemeQuery, useSetUserThemeMutation } from '@/api/themeApi';
import { selectUserId } from '@/redux/selectors/auth';
import { useAppSelector } from '@/redux/store';
import { Theme } from '@/types/themes';

export const useTheme = () => {
  const isDark = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
  const [currentTheme, setCurrentTheme] = useState<Theme>(isDark ? 'dark' : 'light');
  const userId = useAppSelector(selectUserId);

  const { data: themeData, isLoading: isLoadingTheme } = useGetUserThemeQuery(
    { userId: userId ?? 0 },
    { skip: !userId },
  );

  const [setUserTheme, { isLoading: isSettingTheme }] = useSetUserThemeMutation();

  useEffect(() => {
    if (themeData?.theme && themeData.theme !== currentTheme) {
      setCurrentTheme(themeData.theme);
    }
  }, [themeData?.theme, currentTheme]);

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
