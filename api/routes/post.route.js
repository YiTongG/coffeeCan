import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controller/post.controller.js";

const router = express.Router();

// 获取所有帖子，支持查询参数
router.get("/", getPosts);

// 获取特定帖子
router.get("/:id", getPost);

// 添加新帖子，要求验证 token
router.post("/", verifyToken, addPost);

// 更新指定帖子，要求验证 token
router.put("/:id", verifyToken, updatePost);

// 删除指定帖子，要求验证 token
router.delete("/:id", verifyToken, deletePost);

export default router;
