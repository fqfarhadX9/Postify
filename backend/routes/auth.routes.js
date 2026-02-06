const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/auth.controller.js");

router.post("/sign-up", signup);
router.post("/log-in", login);

module.exports = router;
