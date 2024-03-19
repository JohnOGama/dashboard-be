import { Request, RequestHandler, Response } from "express";
import User from "../model/registerSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser: RequestHandler = async (
  req: Request,
  res: Response,
  next
) => {
  try {
    const { username, email, password } = req.body;
    const userExist = await User.findOne({ email });

    console.log("username", username);

    if (!username || !email || !password) {
      res.status(400);
      throw new Error("All fields are required");
    }

    if (userExist) {
      res.status(400);
      throw new Error("Email is already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(200).json({ _id: user.id, email: user.email });
    } else {
      res.status(400);
      throw new Error("User data is invalid");
    }
  } catch (error) {
    next(error);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET || "12345",
        { expiresIn: "15m" }
      );

      res.status(200).json({ accessToken });
    } else {
      res.status(400).json({ message: "Invalid password or email" });
    }
  } catch (error) {
    next(error);
  }
};

export const getUser: RequestHandler = async (req: any, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};
