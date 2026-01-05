const express = require("express");
const router = express.Router();
const routineController = require("../controllers/routineController");
const verifyToken = require("../middlewares/authMiddleware");

router.post("/", verifyToken, routineController.createRoutine);
router.get("/my-routines", verifyToken, routineController.getMyRoutines);

module.exports = router;
