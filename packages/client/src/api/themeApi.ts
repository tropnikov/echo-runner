import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrlLocal } from '@/constants/apiEndpoint';
import { GetUserThemeResponse, SetUserThemeArgs, SetUserThemeResponse } from '@/types/themes';

export const themeApi = createApi({
  reducerPath: 'themeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrlLocal,
    credentials: 'include',
  }),
  tagTypes: ['UserTheme'],
  endpoints: (build) => ({
    getUserTheme: build.query<GetUserThemeResponse, void>({
      queryFn: async () => {
        const response = await fetch(`${baseUrlLocal}/theme`, {
          credentials: 'include',
        });

        if (!response.ok) {
          if (response.status === 404) {
            return { data: null };
          }

          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return { data: await response.json() };
      },
      providesTags: ['UserTheme'],
    }),
    setUserTheme: build.mutation<SetUserThemeResponse, SetUserThemeArgs>({
      queryFn: async ({ theme }: SetUserThemeArgs) => {
        const response = await fetch(`${baseUrlLocal}/theme`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ theme }),
        });

        if (!response.ok) {
          if (response.status === 404) {
            return { data: null };
          }

          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return { data: await response.json() };
      },
      invalidatesTags: ['UserTheme'],
    }),
  }),
});

export const { useGetUserThemeQuery, useLazyGetUserThemeQuery, useSetUserThemeMutation } = themeApi;
