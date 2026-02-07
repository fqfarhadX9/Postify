const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware.js");
const { currentUser } = require("../controllers/user.controller");

router.get("/curr-user", authMiddleware, currentUser);

module.exports = router;
