import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://ya-praktikum.tech/api/v2',
  credentials: 'include',
  prepareHeaders: (headers, { extra }) => {
    const req = (extra as { req?: { headers?: Record<string, string> } })?.req;
    if (req?.headers?.cookie) headers.set('cookie', req.headers.cookie);
    return headers;
  },
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
