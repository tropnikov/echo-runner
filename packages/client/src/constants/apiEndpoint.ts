export const baseUrl =
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://ya-praktikum.tech/api/v2';

export const baseUrlLocal = 'http://localhost:3001/api/v1';
