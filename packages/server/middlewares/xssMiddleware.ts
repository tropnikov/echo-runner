import { NextFunction, Request, Response } from 'express';
import xss from 'xss';

function sanitizeObjectInPlace(obj: Record<string, unknown> | undefined): void {
  if (!obj) return;

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === 'string') {
      obj[key] = xss(value);
    } else if (Array.isArray(value)) {
      sanitizeArrayInPlace(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitizeObjectInPlace(value as Record<string, unknown>);
    }
  }
}

function sanitizeArrayInPlace(arr: unknown[]): void {
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    if (typeof value === 'string') {
      arr[i] = xss(value);
    } else if (Array.isArray(value)) {
      sanitizeArrayInPlace(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitizeObjectInPlace(value as Record<string, unknown>);
    }
  }
}

export function xssMiddleware(req: Request, _res: Response, next: NextFunction): void {
  sanitizeObjectInPlace(req.body as Record<string, unknown> | undefined);
  sanitizeObjectInPlace(req.query as unknown as Record<string, unknown> | undefined);
  sanitizeObjectInPlace(req.params as unknown as Record<string, unknown> | undefined);

  next();
}
