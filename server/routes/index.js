import express from "express";
import UserRoute from "./User.js";
import ItemRoute from "./Item.js";

const router = express.Router();

router.use("/user", UserRoute);
router.use("/item", ItemRoute);

export default router;
