import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Response } from 'express';

const baseFetchQuery = fetchBaseQuery({
  baseUrl: typeof window === 'undefined' ? 'https://ya-praktikum.tech/api/v2' : '/api/v2',
  credentials: 'include',
  prepareHeaders: (headers, { extra }) => {
    const extraArgument = extra as {
      ctx?: {
        cookies?: Record<string, string>;
        res?: Response;
      };
    };

    if (typeof window === 'undefined' && extraArgument?.ctx?.cookies) {
      const cookieString = Object.entries(extraArgument.ctx.cookies)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');
      headers.set('cookie', cookieString);
    } else if (typeof window !== 'undefined') {
      console.log('credentials: include should handle cookies automatically');
    } else {
      console.log('No cookies from browser context');
    }

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

const baseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseFetchQuery(args, api, extraOptions);

  if (typeof window === 'undefined' && result.meta?.response) {
    const extraArgument = api.extra as {
      ctx?: {
        res?: Response;
      };
    };

    if (extraArgument?.ctx?.res) {
      const setCookieHeader = result.meta.response.headers.get('set-cookie');

      if (setCookieHeader) {
        const isDev = process.env.NODE_ENV === 'development';

        const cookieStrings = setCookieHeader.split(/,\s*(?=[a-zA-Z_][a-zA-Z0-9_]*=)/);

        const modifiedCookies = cookieStrings.map((cookie) => {
          const trimmedCookie = cookie.trim();
          if (isDev) {
            return trimmedCookie.replace(/; Domain=ya-praktikum\.tech/g, '; Domain=localhost').replace(/; Secure/g, '');
          } else {
            return trimmedCookie;
          }
        });

        if (modifiedCookies.length > 0) {
          extraArgument.ctx.res.setHeader('Set-Cookie', modifiedCookies);
        }
      }
    }
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
