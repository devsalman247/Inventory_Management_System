import { Router } from "express";
import VendorController from "../../controllers/Vendor.js";
import UserAuth from "../../middlewares/Auth.js";

const router = Router();
const { VendorAdd, VendorFetchAll, VendorUpdate, VendorDelete } = VendorController;
const { verifyToken, isAdmin } = UserAuth;

router.use(verifyToken);

router.post("/", VendorAdd);
router.get("/", VendorFetchAll);
router.put("/:id", VendorUpdate);
router.delete("/:id", VendorDelete);

export default router;
