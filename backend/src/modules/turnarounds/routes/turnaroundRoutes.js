const express = require("express");

const turnaroundController = require(
  "../controllers/turnaroundController"
);

const {
  authenticate,
} = require("../../../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authenticate,
  turnaroundController.createTurnaround
);

router.get(
  "/",
  authenticate,
  turnaroundController.getAllTurnarounds
);

module.exports = router;