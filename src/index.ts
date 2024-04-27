import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/dbConnection";
import UserRoutes from "./routes/UserRoutes";

//create app
const app = express();

const port = process.env.PORT || 3001;

connectDB();

app.use(express.json());
app.use(cors());

//use to test the deployment success or not
app.get("/health", async (req: Request, res: Response) => {
  res.status(200).json({ message: "Health is ok" });
});

app.use("/api/my/user", UserRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
