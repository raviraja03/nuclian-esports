// Admin only routes
import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./users.admin.controller.js";
import {
  login,
  getProfile,
  updateProfile,
  logout,
} from "./users.controller.js";
import { authorize, protect } from "../../middleware/auth.js";

const userAdminRouter = Router();

userAdminRouter.route("/login").post(login);
userAdminRouter.post("/logout", logout);
userAdminRouter.use(protect);
userAdminRouter.use(authorize("admin", "superadmin"));
// Admin routes

userAdminRouter.route("/profile").get(getProfile).patch(updateProfile);
userAdminRouter.route("/").get(getUsers);

userAdminRouter
  .route("/profile/:id")
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

export default userAdminRouter;
