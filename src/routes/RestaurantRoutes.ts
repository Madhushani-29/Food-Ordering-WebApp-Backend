import express from "express";
import RestaurantController from "../controller/RestaurantController";
import multer from "multer";

const router = express.Router();

//creates a storage engine that stores uploaded files in memory (RAM) as Buffer objects
//the uploaded files are not stored on the disk but remain in memory
//can be useful for handling small files or cases where you don't want to save files to disk.
const storage = multer.memoryStorage();
const upload = multer({
  //specifies the storage engine to be used for handling file storage
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

router.post(
  "/",
  /*check the body for 'imageFile property and validate it with above also and 
  if there are any validations, it will send a error message to FE, 
  then it will append a image object can use in controller function' */
  upload.single("imageFile"),
  RestaurantController.createRestaurant
);

export default router;
