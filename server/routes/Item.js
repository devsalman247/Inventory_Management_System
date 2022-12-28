import { Router } from "express";
import ItemController from "../controllers/Item.js";
import UserAuth from "../middlewares/Auth.js";

const router = Router();
const { ItemGetAll, ItemGetById, ItemCreate, ItemUpdate, ItemDelete } = ItemController;
const { verifyToken, isAdmin } = UserAuth;

router.use(verifyToken);

router.get("/", ItemGetAll);
router.get("/:id", ItemGetById);
router.post("/", isAdmin, ItemCreate);
router.put("/:id", isAdmin, ItemUpdate);
router.delete("/:id", isAdmin, ItemDelete);

export default router;
