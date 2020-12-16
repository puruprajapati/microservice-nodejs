import express from 'express';

import { currentUser } from '../middlewares/current-user';
// import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.get(
  '/api/users/currentuser',
  currentUser,
  //requireAuth,
  (req, res) => {
    res.send({ currentUser: req.currentUser || null }); // need to send null insted of undefined
  }
);

export { router as currentUserRouter };
