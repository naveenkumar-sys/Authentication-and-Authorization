import express from "express";
import {
  getAllUser,
  loginUser,
  registerUser,
} from "../Controllers/UserControllers.js";
import { authMiddleware } from "../Middlewares/AuthMiddleware.js";
import { adminMiddleware } from "../Middlewares/adminMiddleware.js";


const router = express.Router();

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.get("/getAll", authMiddleware,adminMiddleware, getAllUser);

export default router;
