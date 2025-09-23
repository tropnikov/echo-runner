import { NextFunction, Request, Response } from 'express';
import fetch from 'node-fetch';
import { User } from 'User';

import { authFailMessage } from '../constants/authFailMessage';
import { cookieNotFoundMessage } from '../constants/cookieNotFoundMessage';
import { getUserURL } from '../constants/getUserURL';
import ForbiddenError from '../errors/ForbiddenError';

export async function authMiddleware(req: Request, _res: Response, next: NextFunction): Promise<void> {
  const { authCookie, uuid } = req.cookies;

  if (!authCookie || !uuid) {
    return next(new ForbiddenError(cookieNotFoundMessage));
  }

  try {
    const response = await fetch(getUserURL, {
      headers: {
        cookie: `authCookie=${authCookie}; uuid=${uuid}`,
      },
    });

    if (!response.ok) {
      return next(new ForbiddenError(authFailMessage));
    }

    const user = (await response.json()) as User;

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}
