import User from "../Model/userSchema.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  try {
    // Get token from Authorization header (Bearer token)
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token Missing - Please Login" });
    }
    //decoding that token result and decoded result will be
    //{
    //   _id: "65712e34abc78912cdf34123", // user's id from database
    //   iat: 1732345678 // token creation time (Issued At)
    // }

    // Verify token and decode data
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Fetch logged-in user details from database (exclude password)
    req.user = await User.findById(decoded._id).select("-password");
    if (!req.user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    next(); // move to next middleware/controller
  } catch (error) {
    return res.status(401).json({ message: "Invalid or Expired Token" });
  }
};
