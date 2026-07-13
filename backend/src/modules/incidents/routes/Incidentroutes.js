const express = require("express");
const router = express.Router();
const incidentController = require("../controllers/incidentController");
const { authenticate } = require("../../../middleware/authMiddleware");

router.get("/", authenticate, incidentController.getAllIncidents);
router.get("/:id", authenticate, incidentController.getIncidentById);
router.post("/", authenticate, incidentController.createIncident);
router.patch("/:id/status", authenticate, incidentController.updateIncidentStatus);

module.exports = router;