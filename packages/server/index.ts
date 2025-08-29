import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Response } from 'express';

import { createClientAndConnect } from './db';
import { authMiddleware, RequestWithUser } from './middlewares/authMiddleware';

dotenv.config();

const app = express();
app.use(cors());
app.use(cookieParser());

const port = Number(process.env.SERVER_PORT) || 3001;

app.use((req, res, next) => {
  const publicPaths = ['/', '/signin', '/signup', '/oauth'];
  if (publicPaths.includes(req.path)) {
    next();
  }
  authMiddleware(req, res, next);
});

createClientAndConnect();

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)');
});

app.get('/private', (req: RequestWithUser, res: Response): void => {
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
