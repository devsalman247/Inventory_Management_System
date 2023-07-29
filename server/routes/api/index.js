import express from "express";
import UserRoute from "./User.js";
import ItemRoute from "./Item.js";
import VendorRoute from "./Vendor.js";
import Upload from "./Upload.js";

const router = express.Router();

router.use("/user", UserRoute);
router.use("/item", ItemRoute);
router.use("/upload", Upload);
router.use("/vendor", VendorRoute);

export default router;
