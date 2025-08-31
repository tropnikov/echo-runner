import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

import { createClientAndConnect } from './db';
import { authMiddleware } from './middlewares/authMiddleware';

dotenv.config();

const app = express();
app.use(cors());
app.use(cookieParser());

const port = Number(process.env.SERVER_PORT) || 3001;

app.use((req, res, next) => {
  const publicPaths = ['/', '/signin', '/signup', '/oauth'];
  if (publicPaths.includes(req.path)) {
    return next();
  }
  return authMiddleware(req, res, next);
});

createClientAndConnect();

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)');
});

app.get('/private', (req: Request, res: Response): void => {
  if (!req.user) {
    res.status(403).json({ reason: 'Forbidden' });
    return;
  }

  res.json({
    id: req.user.id,
    login: req.user.login,
  });
});

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
