import { v2 } from 'cloudinary';
import Hotel from '../models/hotelModel.js';

export const addHotel = async (req, res) => {
  try {
    const imageFiles = req.files;

    // Check if imageFiles is defined and is an array
    if (!imageFiles || !Array.isArray(imageFiles)) {
      return res.status(400).json({
        message: 'No images uploaded or images are not in the correct format',
      });
    }

    const newHotel = new Hotel(req.body);

    // upload images to cloudinary
    const uploadPromises = imageFiles?.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString('base64');
      let dataURI = 'data:' + image.mimetype + ';base64,' + b64;
      const res = await v2.uploader.upload(dataURI);
      return res.url;
    });

    // if upload successfull add the urls to the new hotel
    const imageUrls = await Promise.all(uploadPromises);
    newHotel.imgUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    // save new hotel to db
    const hotel = new Hotel(newHotel);
    await hotel.save();
    res.status(201).send(hotel);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
