import { NextFunction, Request, Response } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authCookie = req.cookies?.authCookie;

  if (!authCookie) {
    return res.status(403).json({ reason: 'Unauthorized' });
  }

  return next();
}
