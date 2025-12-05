import express from "express";
import {
  getAllUser,
  loginUser,
  registerUser,
} from "../Controllers/UserControllers.js";
import { adminMiddleware } from "../Middleware/adminMiddleware.js";
import { authMiddleware } from "../Middleware/AuthMiddleware.js";



const router = express.Router();

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.get("/getAll",authMiddleware,adminMiddleware,getAllUser);


export default router;
