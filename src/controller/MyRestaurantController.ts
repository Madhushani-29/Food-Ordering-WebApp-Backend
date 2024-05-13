import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";

const getCurrentRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userID });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" }).send();
    }
    res.status(200).json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error finding the restaurant" });
  }
};

const createRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userID });

    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "Restaurant already exists" })
        .send();
    }

    //get image from the request
    //req.file is the file object
    const imageUrl = await uploadImage(req.file as Express.Multer.File);

    //embaded the userID and imageURL restautant object- can use as below when use .save() method
    //const restaurant = new Restaurant(req.body);
    //restaurant.imageUrl = imageUrl;
    //restaurant.user = new mongoose.Types.ObjectId(req.userID);

    const restaurant = await Restaurant.create({
      ...req.body,
      user: req.userID,
      imageUrl: imageUrl,
      lastUpdated: Date(),
    });

    res
      .status(201)
      .json({ message: "Restaurant created successfully", restaurant });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating restaurant" });
  }
};

const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userID });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found!" }).send();
    }

    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.lastUpdated = new Date();

    if (req.file) {
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      restaurant.imageUrl = imageUrl;
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurant._id,
      restaurant,
      //{ new: true } tells Mongoose to return the updated document
      { new: true }
    );

    res.status(201).json(updatedRestaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating restaurant" });
  }
};

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  //convert image to base64 image
  const base64Image = Buffer.from(image.buffer).toString("base64");
  //mime type is a image type like png
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  //upload image to cloudinary
  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
};

export default {
  createRestaurant,
  getCurrentRestaurant,
  updateRestaurant,
};
