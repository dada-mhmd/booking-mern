import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import hotelRoutes from './routes/hotelRoutes.js';

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('db connected');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

db();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/my-hotels', hotelRoutes);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
