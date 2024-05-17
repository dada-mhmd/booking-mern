import express from 'express';
import { check } from 'express-validator';

import { getUserInfo, login, logout } from '../controllers/authCtrl.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required'),
  ],
  login
);

router.get('/validate-token', verifyToken, getUserInfo);
router.post('/logout', logout);

export default router;
