import { Router } from "express";
import UserConroller from "../controllers/User.js";
import UserAuth from "../middlewares/Auth.js";

const router = Router();
const { UserSignUp, UserLogin } = UserConroller;
const { verifyToken, isAdmin } = UserAuth;

router.post("/signup", UserSignUp);

router.post("/login", UserLogin);

export default router;
