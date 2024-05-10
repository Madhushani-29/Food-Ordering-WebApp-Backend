import { Request, Response } from "express";

const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Checkout Session Created!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error !" });
  }
};

export default {
  createCheckoutSession,
};
