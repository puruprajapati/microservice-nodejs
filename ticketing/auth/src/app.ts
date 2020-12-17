import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

import config from './config/config';

const app = express();
// app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false, // not encrypted cookie
    secure: config.needSecureEnv, // true for https, false for http
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

//above code only work if we install express-async-errors
// other wise we need to work on sync only
// as for async, for express to work we need to pass error as next('error') not throw as below
// app.all('*', async (req, res, next) => {
//   next(new NotFoundError());
// });

app.use(errorHandler);

export { app };
