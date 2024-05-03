import { Request, Response } from "express";
import Restaurant from "../models/restaurant";

const searchRestaurant = async (req: Request, res: Response) => {
  try {
    // search query come with the url
    // required something(main search) for the criteria like ids and search words
    const city = req.params.city;

    // query params
    // typically follow the "?" character in a URL and consist of key-value pairs separated by "&" symbols
    // any filtering, sorting and any other key search terms
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export default {
  searchRestaurant,
};
