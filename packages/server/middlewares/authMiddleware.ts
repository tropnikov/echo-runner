import { NextFunction, Request, Response } from 'express';

// простой вариант: проверяем только наличие куки
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authCookie = req.cookies?.authCookie;

  if (!authCookie) {
    return res.status(401).json({ reason: 'Unauthorized' });
    return;
  }

  return next();
}
