export type Theme = 'dark' | 'light';

export type GetUserThemeResponse = {
  id: number;
  theme: Theme;
};

export type SetUserThemeResponse = {
  theme: Theme;
  id: number;
};

export type SetUserThemeArgs = {
  theme: Theme;
};
