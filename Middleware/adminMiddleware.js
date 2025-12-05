import User from "../Model/userSchema.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const adminMiddleware = async (req, res, next) => {
  try {
    // Get token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token Missing" });
    }
    //decoding that token result and decoded result will be
    //{
    //   _id: "65712e34abc78912cdf34123", // user's id from database
    //   iat: 1732345678 // token creation time (Issued At)
    // }
    // Decode token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Fetch the full user details from DB (without password)
    req.user = await User.findById(decoded._id).select("-password");

    if (!req.user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // Check admin role
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied - Admin Only" });
    }

    next(); // Continue to controller
  } catch (error) {
    res
      .status(500)
      .json({ message: "Invalid Token or Server Error", error: error.message });
  }
};
