import { Router } from "express";
import UserConroller from "../controllers/User.js";
import UserAuth from "../middlewares/Auth.js";

const router = Router();
const { UserSignUp, UserLogin, UserDelete } = UserConroller;
const { verifyToken, isAdmin } = UserAuth;

router.post("/signup", UserSignUp);
router.post("/login", UserLogin);
router.delete("/:id", verifyToken, isAdmin, UserDelete);

export default router;
