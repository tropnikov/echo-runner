import { AppError } from 'AppError';
import { NextFunction, Request, Response } from 'express';

import { serverErrorMessage } from '../constants/serverErrorMessage';

export default function (err: AppError, _: Request, res: Response, next: NextFunction) {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? serverErrorMessage : message,
  });

  next();
}
