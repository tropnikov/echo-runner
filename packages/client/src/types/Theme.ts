export type Theme = 'dark' | 'light';

export type GetUserThemeResponse = {
  theme: Theme;
};

export type GetUserThemeArgs = {
  userId: number;
};

export type SetUserThemeResponse = {
  theme: Theme;
};

export type SetUserThemeArgs = {
  userId: number;
  theme: Theme;
};
