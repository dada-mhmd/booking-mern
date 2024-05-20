import express from 'express';
import multer from 'multer';
import { addHotel } from '../controllers/hotelCtrl.js';
import { verifyToken } from '../middlewares/auth.js';
import { body } from 'express-validator';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post(
  '/',
  verifyToken,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('type').notEmpty().withMessage('Type is required'),
    body('pricePerNight')
      .notEmpty()
      .isNumeric()
      .withMessage('PricePerNight is required and must be a number'),
    body('facilities')
      .notEmpty()
      .isArray()
      .withMessage('Facilities are required'),
  ],

  upload.array('imageFiles', 6),
  addHotel
);

export default router;
