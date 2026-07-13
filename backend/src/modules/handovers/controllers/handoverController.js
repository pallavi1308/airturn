const service = require("../services/handoverService");

const createHandover = async (req, res) => {
  try {
    const handover = await service.createHandover({
      ...req.body,
      created_by: req.user.id,
    });

    res.json({
      success: true,
      data: handover,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getHandovers = async (req, res) => {
  const data = await service.getHandovers();

  res.json({
    success: true,
    data,
  });
};

module.exports = {
  createHandover,
  getHandovers,
};