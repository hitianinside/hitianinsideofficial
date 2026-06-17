import { Request, Response } from "express";
import axios from "axios";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import User from "../models/authModel";
import { oauth2client } from "../utils/googleConfig";

export const googleLogin = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ message: "Authorization code is required" });
    }

    const { tokens } = await oauth2client.getToken(code as string);

    if (!tokens?.access_token) {
      return res.status(400).json({ message: "Failed to retrieve access token" });
    }

    oauth2client.setCredentials(tokens);

    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
    );

    const { email, name, picture } = data;
    type UserType = {
      _id: string | { toString(): string };
      email: string;
      name?: string;
      image?: string;
    };
    let user = await User.findOne({ email }) as unknown as UserType;
    if (!user) {
      user = await User.create({ name, email, image: picture }) as UserType;
    }

    const JWT_SECRET: Secret = process.env.JWT_SECRET || "default_secret";
    const expiresIn = (process.env.JWT_EXPIRE || "30d") as SignOptions["expiresIn"];

    const payload = { _id: user._id.toString(), email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn });

    return res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error: any) {
    console.error("Google Login Error:", error?.response?.data || error.message);
    return res.status(500).json({
      message: "Internal server error",
      error: error?.response?.data || error.message,
    });
  }
};