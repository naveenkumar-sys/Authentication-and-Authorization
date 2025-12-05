import user from "../Model/userSchema.js";
import jwt from "jsonwebtoken"; // for sign
import bcrypt from "bcrypt"; //for hash and compare
import dotenv from "dotenv";

dotenv.config();

//Register User
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //hashing the password
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new user({ username, email, password: hashPassword });
    await newUser.save();
    res
      .status(200)
      .json({ message: "The user is register successfully", data: newUser });
  } catch (error) {
    res.status(503).json({
      message: "Cannot register the user,error in registering the user",
    });
  }
};

//Login User

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await user.findOne({ email });
    if (!findUser) {
      res.status(403).json({ message: "Cannot find the user" });
    }
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) {
      res.status(403).json({ message: "Invalid password" });
    }
    //Jwt method -sign
    const newToken = jwt.sign({ _id: findUser._id }, process.env.SECRET_KEY);
    findUser.token = newToken;
    await findUser.save();
    res
      .status(200)
      .json({ message: "The user logged in successfully", token: newToken });
  } catch (error) {
    res.status(503).json({
      message: "Cannot login the user,error in login the user",
    });
  }
};

//get user
export const getAllUser = async (req, res) => {
  try {
    const getUser = await user.find();
    res.status(200).json({ message: "Admin User", data: getUser });
  } catch (error) {
    res.status(503).json({
      message: "Cannot get user,error in get the user",
    });
  }
};
