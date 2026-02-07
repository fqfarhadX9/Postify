const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware.js");
const { createTask } = require("../controllers/task.controller");

router.post("/create", authMiddleware, createTask);

module.exports = router;
