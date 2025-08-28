import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

import { api as generatedApi } from '@/api/generated';
import { teamName } from '@/constants/leaderboardStats';

import { AppStore } from './redux/store';
import type { PageInitContext } from './types/pageContext';

export const createUrl = (req: ExpressRequest) => {
  const origin = `${req.protocol}://${req.get('host')}`;

  return new URL(req.originalUrl || req.url, origin);
};

export const createFetchRequest = (req: ExpressRequest) => {
  const url = createUrl(req);

  const controller = new AbortController();
  req.on('close', () => controller.abort());

  const headers = new Headers();

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  const init: {
    method: string;
    headers: Headers;
    signal: AbortSignal;
    credentials: RequestCredentials;
    body?: BodyInit | null;
  } = {
    method: req.method,
    headers,
    signal: controller.signal,
    credentials: 'include',
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body;
  }

  return new Request(url.href, init);
};

export const prefetch = async (store: AppStore, hasCookies = false) => {
  try {
    const preloadPromises = [];

    // Делаем запросы только если есть cookies
    if (hasCookies) {
      preloadPromises.push(store.dispatch(generatedApi.endpoints.getAuthUser.initiate()).unwrap());
      preloadPromises.push(
        store
          .dispatch(
            generatedApi.endpoints.postLeaderboardByTeamName.initiate({
              teamName,
              leaderboardRequest: { ratingFieldName: 'score', cursor: 0, limit: 10 },
            }),
          )
          .unwrap(),
      );
    } else {
      console.log('Skipping prefetch');
    }

    await Promise.all(preloadPromises);
    console.log('Prefetch completed successfully');

    return store.getState();
  } catch (error) {
    console.error('Error prefetching', error);
    return store.getState();
  }
};

export const createContext = (req: ExpressRequest, res?: ExpressResponse): PageInitContext => {
  const requestHeaders = Object.fromEntries(
    Object.entries(req.headers).map(([key, value]) => [key, Array.isArray(value) ? value.join(', ') : value || '']),
  );

  return {
    cookies: req.cookies,
    requestHeaders: {
      ...requestHeaders,
    },
    res,
  };
};
