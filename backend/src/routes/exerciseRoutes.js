const express = require("express");
const router = express.Router();
const exerciseController = require("../controllers/exerciseController");
const verifyToken = require("../middlewares/authMiddleware");

router.get("/", verifyToken, exerciseController.getExercises);
router.post("/", verifyToken, exerciseController.createExercise);

module.exports = router;
