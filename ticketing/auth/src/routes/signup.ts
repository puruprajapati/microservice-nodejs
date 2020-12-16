import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import config from '../config/config';

import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email already in use.');
    }

    const user = User.build({ email, password });
    await user.save();

    // generate jwt
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      config.jwtSecretKey
    );

    // store it on session object
    //req.session.jwt = userJwt;  // to overcome this issue in typescript below code is used
    // we are not sending actual jwt data to browser but base64 encoded
    // e.g. : eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalZtWkRoa1ptRmhPVEV4WW1RNU5HVmxOamM0TlRZd055SXNJbVZ0WVdsc0lqb2ljM1Z3WlhKaFpHMXBia0IwWlhOMExtTnZiU0lzSW1saGRDSTZNVFl3T0RBME9EVTFOWDAuckp1ZGh1MUMyZE9IOHNJNmJrOUF1by1Tckw2VkN5OEd1TVhfYTl5ZEhDTSJ9
    // if we decode it will get acatual jwt data(can be decode in decode https://www.base64decode.org/)
    // decoded data:
    // {"jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDhkZmFhOTExYmQ5NGVlNjc4NTYwNyIsImVtYWlsIjoic3VwZXJhZG1pbkB0ZXN0LmNvbSIsImlhdCI6MTYwODA0ODU1NX0.rJudhu1C2dOH8sI6bk9Auo-SrL6VCy8GuMX_a9ydHCM"}
    // go to jwt.io to decode this jwt data
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
