const express = require("express");

const taskController = require(
  "../controllers/taskController"
);

const {
  authenticate,
} = require("../../../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authenticate,
  taskController.createTask
);

router.get(
  "/turnaround/:turnaroundId",
  authenticate,
  taskController.getTasksByTurnaround
);
router.post(
    "/dependency",
    authenticate,
    taskController.addDependency
  );
  
  router.patch(
    "/:id/status",
    authenticate,
    taskController.updateTaskStatus
  );
module.exports = router;