import { NextFunction, Request, Response } from 'express';
import fetch from 'node-fetch';

import { User } from '../types/User';

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { authCookie, uuid } = req.cookies ?? {};

  if (!authCookie) {
    res.status(401).json({ reason: 'No authCookie provided' });
    return;
  }

  try {
    let cookieHeader = `authCookie=${authCookie}`;
    if (uuid) {
      cookieHeader += `; uuid=${uuid}`;
    }

    const response = await fetch('https://ya-praktikum.tech/api/v2/auth/user', {
      headers: { cookie: cookieHeader },
    });

    if (!response.ok) {
      res.status(403).json({ reason: 'Invalid authCookie' });
      return;
    }

    const user = (await response.json()) as User;
    req.user = user;

    next();
  } catch (error) {
    console.error('Auth check error:', error);
    res.status(500).json({ reason: 'Auth check failed' });
  }
}
