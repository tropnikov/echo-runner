import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrlLocal } from '@/constants/apiEndpoint';
import { GetUserThemeArgs, GetUserThemeResponse, SetUserThemeArgs, SetUserThemeResponse } from '@/types/themes';

export const themeApi = createApi({
  reducerPath: 'themeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrlLocal,
  }),
  tagTypes: ['UserTheme'],
  endpoints: (build) => ({
    getUserTheme: build.query<GetUserThemeResponse, GetUserThemeArgs>({
      queryFn: async ({ userId }: GetUserThemeArgs) => {
        const response = await fetch(`${baseUrlLocal}/theme/${userId}`);

        if (!response.ok) {
          if (response.status === 404) {
            return { data: null };
          }

          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return { data: await response.json() };
      },
      providesTags: (_result, _error, { userId }) => [{ type: 'UserTheme', id: userId }],
    }),
    setUserTheme: build.mutation<SetUserThemeResponse, SetUserThemeArgs>({
      queryFn: async ({ userId, theme }: SetUserThemeArgs) => {
        const response = await fetch(`${baseUrlLocal}/theme`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, theme }),
        });

        if (!response.ok) {
          if (response.status === 404) {
            return { data: null };
          }

          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return { data: await response.json() };
      },
      invalidatesTags: (_result, _error, { userId }) => [{ type: 'UserTheme', id: userId }],
    }),
  }),
});

export const { useGetUserThemeQuery, useLazyGetUserThemeQuery, useSetUserThemeMutation } = themeApi;
