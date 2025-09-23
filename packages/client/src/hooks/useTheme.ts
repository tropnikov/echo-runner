import { useCallback, useEffect, useState } from 'react';

import { useGetUserThemeQuery, useSetUserThemeMutation } from '@/api/themeApi';
import { selectIsAuthorized, selectUserId } from '@/redux/selectors/auth';
import { useAppSelector } from '@/redux/store';
import { Theme } from '@/types/themes';

export const useTheme = () => {
  const isDark = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
  const [currentTheme, setCurrentTheme] = useState<Theme>(isDark ? 'dark' : 'light');
  const isAuthorized = useAppSelector(selectIsAuthorized);

  const {
    data: themeData,
    isLoading: isLoadingTheme,
    refetch,
  } = useGetUserThemeQuery(undefined, {
    skip: !isAuthorized,
  });
  const [setUserTheme, { isLoading: isSettingTheme }] = useSetUserThemeMutation();

  useEffect(() => {
    if (isAuthorized && !isLoadingTheme) {
      refetch();
    }
  }, [isAuthorized, refetch, isLoadingTheme]);

  useEffect(() => {
    if (themeData?.theme && themeData.theme !== currentTheme) {
      setCurrentTheme(themeData.theme);
    }
  }, [themeData?.theme, currentTheme]);

  const changeTheme = useCallback(
    async (newTheme: Theme) => {
      setCurrentTheme(newTheme);

      if (!isAuthorized) return;

      try {
        await setUserTheme({ theme: newTheme });
        refetch();
      } catch (error) {
        setCurrentTheme(currentTheme);
        throw new Error(`Failed to set theme${error instanceof Error ? `: ${error.message}` : ''}`);
      }
    },
    [isAuthorized, setUserTheme, refetch, currentTheme],
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
