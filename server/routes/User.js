import { Router } from "express";
import UserConroller from "../controllers/User.js";
import UserAuth from "../middlewares/Auth.js";

const router = Router();
const { UserSignUp, UserLogin, UserFetchAll, UserProfile, UserUpdate, UserDelete } = UserConroller;
const { verifyToken, isAdmin } = UserAuth;

router.post("/signup", UserSignUp);
router.post("/login", UserLogin);
router.get("/", verifyToken, isAdmin, UserFetchAll);
router.get("/authenticate", verifyToken, UserProfile);
router.put("/:id", verifyToken, isAdmin, UserUpdate);
router.delete("/:id", verifyToken, isAdmin, UserDelete);

export default router;
