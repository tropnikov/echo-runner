import { Response } from 'express';

export type PageInitContext = {
  cookies?: Record<string, string>;
  requestHeaders?: Record<string, string>;
  res?: Response;
};
