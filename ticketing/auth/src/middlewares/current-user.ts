import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import config from '../config/config';

interface UserPayload {
  id: string;
  email: string;
}

// add existing request with currentUser attribute
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // req.session will be null if and only if we do not initialize cookiesession in index i.e. app.use(cookiesession.....
  //if (!req.session || !req.session.jwt) { or this can be equivalent to
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      config.jwtSecretKey
    ) as UserPayload;
    req.currentUser = payload;
  } catch (error) {} // if jwt verify fail, it will throw exception

  next();
};
