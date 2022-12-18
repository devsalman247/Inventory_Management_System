import express from "express";
import UserRoute from "./User.js";

const router = express.Router();

router.use("/user", UserRoute);

export default router;
