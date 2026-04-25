import { Router } from "express";
import {
  getOtherUsers,
  getProfile,
  login,
  logout,
  register,
} from "../controller/user.controller.js";
import { isAuhenticated } from "../middleware/auth.middleware.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get-profile", isAuhenticated, getProfile);
router.post("/logout", isAuhenticated, logout);
router.get("/get-other-users", isAuhenticated, getOtherUsers);

export default router;
