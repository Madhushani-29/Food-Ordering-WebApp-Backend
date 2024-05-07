import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/dbConnection";
import UserRoutes from "./routes/UserRoutes";
import MyRestaurantRoutes from "./routes/MyRestaurantRoutes";
import { v2 as cloudinary } from "cloudinary";
import RestaurantRoutes from "./routes/RestaurantRoutes";

//create app
const app = express();

const port = process.env.PORT || 3001;

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(cors());

//use to test the deployment success or not
app.get("/health", async (req: Request, res: Response) => {
  res.status(200).json({ message: "Health is ok" });
});

app.use("/api/my/user", UserRoutes);
app.use("/api/my/restaurant", MyRestaurantRoutes);
app.use("/api/restaurant", RestaurantRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
