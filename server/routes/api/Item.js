import { Router } from "express";
import ItemController from "../../controllers/Item.js";
import UserAuth from "../../middlewares/Auth.js";

const router = Router();
const {
	ItemGetAll,
	ItemGetById,
	ItemCreate,
	ItemUpdate,
	ItemDelete,
	ItemRequest,
	CancelRequest,
	ApproveRequest,
	RejectRequest,
	RejectRequests,
	ApproveRequests,
	ItemReturnRequest,
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
router.post("/", ItemCreate);
router.post("/request", verifyToken, ItemRequest);
router.post("/return/:id", verifyToken, ItemReturnRequest);
router.post("/request/cancel/:id", verifyToken, CancelRequest);
router.post("/request/approve/:id", verifyToken, ApproveRequest);
router.post("/request/reject/:id", verifyToken, RejectRequest);
router.put("/requests/reject", verifyToken, RejectRequests);
router.put("/requests/approve", verifyToken, ApproveRequests);
router.put("/:id", isAdmin, ItemUpdate);
router.delete("/:id", isAdmin, ItemDelete);

export default router;
