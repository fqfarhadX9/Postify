const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware.js");
const { createTask, getTasks, updateTask } = require("../controllers/task.controller");

router.post("/create", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.put("/:id", authMiddleware, updateTask);


module.exports = router;
