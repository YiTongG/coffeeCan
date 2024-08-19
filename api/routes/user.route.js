import express from "express";
import {
  deleteUser,
  getUsers,
  updateUser,
  savePost,
  profilePosts,
  getNotificationNumber,
  getSavedPosts, // 导入 getSavedPosts 控制器
  getMyList 
} from "../controller/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getUsers);
// router.get("/search/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.post("/save", verifyToken, savePost);
router.get("/profilePosts", verifyToken, profilePosts);
router.get("/notification", verifyToken, getNotificationNumber);
router.get("/savedPosts", verifyToken, getSavedPosts); // 添加 /savedPosts 路由
router.get("/myList", verifyToken, getMyList);
export default router;
