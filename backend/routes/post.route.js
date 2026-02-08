const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware.js");
const { createPost, getFeed } = require("../controllers/post.controller");

router.post("/create", authMiddleware, createPost);
router.get("/feed", authMiddleware, getFeed);

module.exports = router;
