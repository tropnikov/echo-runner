import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { GetUserThemeArgs, GetUserThemeResponse, SetUserThemeArgs, SetUserThemeResponse } from '@/types/themes';

import { themeMock } from './themeMock';

export const themeApi = createApi({
  reducerPath: 'themeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/theme',
  }),
  tagTypes: ['UserTheme'],
  endpoints: (build) => ({
    getUserTheme: build.query<GetUserThemeResponse, GetUserThemeArgs>({
      queryFn: async ({ userId }: GetUserThemeArgs) => {
        const theme = themeMock.getTheme(userId);
        return {
          data: { theme },
        };
      },
      providesTags: (_result, _error, { userId }) => [{ type: 'UserTheme', id: userId }],
    }),
    setUserTheme: build.mutation<SetUserThemeResponse, SetUserThemeArgs>({
      queryFn: async ({ userId, theme }: SetUserThemeArgs) => {
        const newTheme = themeMock.setTheme(userId, theme);
        return {
          data: { theme: newTheme },
        };
      },
      invalidatesTags: (_result, _error, { userId }) => [{ type: 'UserTheme', id: userId }],
    }),
  }),
});

export const { useGetUserThemeQuery, useLazyGetUserThemeQuery, useSetUserThemeMutation } = themeApi;
