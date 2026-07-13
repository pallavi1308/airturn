const turnaroundService = require("../services/turnaroundService");

const createTurnaround = async (req, res) => {
  try {
    const turnaround =
      await turnaroundService.createTurnaround(req.body);

    res.status(201).json({
      success: true,
      data: turnaround,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllTurnarounds = async (req, res) => {
  try {
    const turnarounds =
      await turnaroundService.getAllTurnarounds();

    res.status(200).json({
      success: true,
      data: turnarounds,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTurnaround,
  getAllTurnarounds,
};