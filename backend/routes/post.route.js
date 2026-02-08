const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware.js");
const { createPost } = require("../controllers/post.controller");

router.post("/create", authMiddleware, createPost);

module.exports = router;
