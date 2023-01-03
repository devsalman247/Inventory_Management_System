import { Router } from "express";
import ItemController from "../controllers/Item.js";
import UserAuth from "../middlewares/Auth.js";

const router = Router();
const {
	ItemGetAll,
	ItemGetById,
	ItemCreate,
	ItemUpdate,
	ItemDelete,
	ItemIssue,
	ItemGetAllIssued,
	ItemGetIssuedById,
	ItemUpdateIssued,
} = ItemController;
const { verifyToken, isAdmin } = UserAuth;

router.use(verifyToken);

// Issued Items Routes
router.get("/issued", isAdmin, ItemGetAllIssued);
router.get("/issued/:id", isAdmin, ItemGetIssuedById);
router.post("/issued", isAdmin, ItemIssue);
router.put("/issued/:id", isAdmin, ItemUpdateIssued);

// Items Routes
router.get("/", ItemGetAll);
router.get("/:id", ItemGetById);
router.post("/", isAdmin, ItemCreate);
router.put("/:id", isAdmin, ItemUpdate);
router.delete("/:id", isAdmin, ItemDelete);

export default router;
