import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

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

app.get('/private', (_req, res) => {
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
