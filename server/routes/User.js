import { Router } from "express";
import UserConroller from "../controllers/User.js";
import UserAuth from "../middlewares/Auth.js";

const router = Router();
const { UserSignUp, UserLogin, UserFetchAll, UserDelete, UserUpdate } = UserConroller;
const { verifyToken, isAdmin } = UserAuth;

router.post("/signup", UserSignUp);
router.post("/login", UserLogin);
router.get("/", verifyToken, isAdmin, UserFetchAll);
router.delete("/:id", verifyToken, isAdmin, UserDelete);
router.put("/:id", verifyToken, isAdmin, UserUpdate);

export default router;
