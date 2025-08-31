import { NextFunction, Request, RequestHandler, Response } from 'express';

import { authFailMessage } from '../constants/authFailMessage';
import ForbiddenError from '../errors/ForbiddenError';
import { ProtectedRequest } from '../types/ProtectedRequest';

export function withAuth(handler: (req: ProtectedRequest, res: Response, next: NextFunction) => void): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ForbiddenError(authFailMessage));
    }

    return handler(req as ProtectedRequest, res, next);
  };
}
