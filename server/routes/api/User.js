import { Router } from "express";
import UserConroller from "../../controllers/User.js";
import UserAuth from "../../middlewares/Auth.js";

const router = Router();
const { UserSignUp, UserLogin, UserAdd, UserProfile, UserFetchAll, UserRequests, UserDelete, UserUpdate } =
	UserConroller;
const { verifyToken, isAdmin } = UserAuth;

router.get("/", verifyToken, isAdmin, UserFetchAll);
router.post("/signup", UserSignUp);
router.post("/login", UserLogin);
router.post("/add", verifyToken, isAdmin, UserAdd);
router.get("/context", verifyToken, UserProfile);
router.get("/requests", verifyToken, UserRequests);
router.delete("/:id", verifyToken, isAdmin, UserDelete);
router.put("/:id", verifyToken, isAdmin, UserUpdate);

export default router;
