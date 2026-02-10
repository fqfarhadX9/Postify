const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware.js");
const { createPost, getFeed, likePost, commentPost } = require("../controllers/post.controller");
const upload = require("../middleware/multer.middleware.js");

// router.post("/create", authMiddleware, createPost);
router.post("/create", authMiddleware, upload.single("image"), createPost);
router.get("/feed", authMiddleware, getFeed);
router.put("/:id/like", authMiddleware, likePost);
router.post("/:postId/comment", authMiddleware, commentPost);

module.exports = router;
