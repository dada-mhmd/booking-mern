import express from 'express';
import { check } from 'express-validator';

import { register } from '../controllers/userCtrl.js';
const router = express.Router();

router.post(
  '/register',
  [
    check('firstName', 'First Name is required').isString(),
    check('lastName', 'Last Name is required').isString(),
    check('email', 'Email is required').isEmail(),
    check(
      'password',
      'Password is required and must be at least 6 characters'
    ).isLength({ min: 6, max: 14 }),
  ],
  register
);

export default router;
