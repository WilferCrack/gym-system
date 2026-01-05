const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middlewares/authMiddleware.js");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/clients", verifyToken, authController.getClients);

module.exports = router;
