import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

// only error handler will contain 4 param, other will 3
// error is extra
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  res.status(400).send({
    errors: [{ message: 'Something went wrong!' }],
  });
};
