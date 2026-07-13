const express = require("express");
const router = express.Router();

const controller = require("../controllers/handoverController");

const {
  authenticate,
} = require("../../../middleware/authMiddleware");

router.post("/", authenticate, controller.createHandover);

router.get("/", authenticate, controller.getHandovers);

module.exports = router;