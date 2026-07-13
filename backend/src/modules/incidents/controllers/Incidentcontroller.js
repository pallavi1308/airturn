const incidentService = require("../services/incidentService");

const createIncident = async (req, res) => {
  try {
    const incident = await incidentService.createIncident({
      ...req.body,
      reporter_id: req.user.id,
    });
    res.status(201).json({ success: true, data: incident });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllIncidents = async (req, res) => {
  try {
    const { status, severity, category } = req.query;
    const incidents = await incidentService.getAllIncidents({
      status,
      severity,
      category,
    });
    res.status(200).json({ success: true, data: incidents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getIncidentById = async (req, res) => {
  try {
    const incident = await incidentService.getIncidentById(req.params.id);
    if (!incident) {
      return res
        .status(404)
        .json({ success: false, message: "Incident not found" });
    }
    res.status(200).json({ success: true, data: incident });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateIncidentStatus = async (req, res) => {
  try {
    const incident = await incidentService.updateIncidentStatus(
      req.params.id,
      req.body.status,
      req.user.id
    );
    res.status(200).json({ success: true, data: incident });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createIncident,
  getAllIncidents,
  getIncidentById,
  updateIncidentStatus,
};