import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://ya-praktikum.tech/api/v2',
  credentials: 'include',
  responseHandler: async (response) => {
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  },
});

export const api = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
