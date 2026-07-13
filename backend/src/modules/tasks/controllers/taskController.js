const taskService = require("../services/taskService");

const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getTasksByTurnaround = async (req, res) => {
  try {
    const tasks =
      await taskService.getTasksByTurnaround(
        req.params.turnaroundId
      );

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const addDependency = async (req, res) => {
    try {
      const dependency =
        await taskService.addDependency(
          req.body.task_id,
          req.body.depends_on_task_id
        );
  
      res.status(201).json({
        success: true,
        data: dependency,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  const updateTaskStatus = async (req, res) => {
    try {
      const task =
        await taskService.updateTaskStatus(
          req.params.id,
          req.body.status
        );
  
      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  module.exports = {
    createTask,
    getTasksByTurnaround,
    addDependency,
    updateTaskStatus,
  };