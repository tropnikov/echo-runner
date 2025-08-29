import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { initializeDatabase } from './db';
import NotFoundError from './errors/NotFoundError';
import centralErrorHandler from './middlewares/centralErrorHandler';
import { errorLogger, requestLogger } from './middlewares/logger';
import { xssMiddleware } from './middlewares/xssMiddleware';
import routes from './routes';

dotenv.config();

const port = Number(process.env.SERVER_PORT) || 3001;

const startServer = async () => {
  try {
    await initializeDatabase();

    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(xssMiddleware);
    app.use(requestLogger);

    app.use(
      rateLimit({
        max: 100,
        windowMs: 15 * 60 * 100,
        message: { message: 'Too many requests from this IP' },
      }),
    );

    app.use('/api/v1', routes);

    app.use('*', (_req: Request, _res: Response, next: NextFunction) =>
      next(new NotFoundError('Некорректный путь запроса')),
    );

    app.use(errorLogger);
    app.use(errors());
    app.use(centralErrorHandler);

    app.listen(port, () => {
      console.log(`➜ 🎸 Server is listening on port: ${port}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
