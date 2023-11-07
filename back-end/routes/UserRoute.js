import express from "express";

const router = express.Router();
import {
  login,
  register,
  logOut,
  getUserProfile,
  editUserProfile,
} from "../controllers/UserController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").post(protect, logOut);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, editUserProfile);

export default router;
