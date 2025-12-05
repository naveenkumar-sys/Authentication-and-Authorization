import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/db.config.js";
import router from "./Routers/userRouter.js";

//dotenv configuration
dotenv.config();

//initialization
const app = express();

//default middleware
app.use(express.json());

//cors middle ware
app.use(cors());

//call connectDB
connectDB();

//default router
app.get("/", (req, res) => {
  res.status(200).send("Welcome to backend!🖐️");
});

//custom router
app.use("/api/authentication",router)

//port form .env
const port = process.env.PORT || 5000;

//starting the server
app.listen(port, () => {
  console.log(`The server is running on ${port}`);
});
