export type Theme = 'dark' | 'light';

export type GetUserThemeResponse = {
  id: number;
  userId: number;
  theme: Theme;
};

export type GetUserThemeArgs = {
  userId: number;
};

export type SetUserThemeResponse = {
  theme: Theme;
  id: number;
  userId: number;
};

export type SetUserThemeArgs = {
  userId: number;
  theme: Theme;
};
