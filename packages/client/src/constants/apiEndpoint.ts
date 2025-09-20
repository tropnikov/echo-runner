import { APP_DOMAIN } from './domain';

export const baseUrl =
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://ya-praktikum.tech/api/v2';

export const baseUrlAPI_dev =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api/v1' : `https://${APP_DOMAIN}/api/v1`;
