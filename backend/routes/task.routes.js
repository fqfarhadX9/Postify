const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware.js");
const { createTask, getTasks } = require("../controllers/task.controller");

router.post("/create", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);

module.exports = router;
