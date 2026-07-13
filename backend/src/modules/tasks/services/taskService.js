const pool = require("../../../db/db");

const createTask = async (data) => {
  const {
    turnaround_id,
    title,
    description,
    assigned_role,
    priority,
    sla_target,
  } = data;

  const result = await pool.query(
    `
    INSERT INTO operational_tasks (
      turnaround_id,
      title,
      description,
      assigned_role,
      priority,
      sla_target
    )
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *
    `,
    [
      turnaround_id,
      title,
      description,
      assigned_role,
      priority,
      sla_target,
    ]
  );

  return result.rows[0];
};

const getTasksByTurnaround = async (turnaroundId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM operational_tasks
    WHERE turnaround_id = $1
    ORDER BY created_at ASC
    `,
    [turnaroundId]
  );

  return result.rows;
};
const addDependency = async (taskId, dependsOnTaskId) => {
    const result = await pool.query(
      `
      INSERT INTO task_dependencies (
        task_id,
        depends_on_task_id
      )
      VALUES ($1, $2)
      RETURNING *
      `,
      [taskId, dependsOnTaskId]
    );
    global.io.emit("task.dependency_added", {
        task_id: taskId,
        depends_on_task_id: dependsOnTaskId,
      });
    return result.rows[0];
  };
  const canTaskStart = async (taskId) => {
    const dependencyResult = await pool.query(
      `
      SELECT ot.status
      FROM task_dependencies td
      JOIN operational_tasks ot
        ON td.depends_on_task_id = ot.id
      WHERE td.task_id = $1
      `,
      [taskId]
    );
  
    const dependencies = dependencyResult.rows;
  
    const blocked = dependencies.some(
      (dep) => dep.status !== "COMPLETED"
    );
  
    return !blocked;
  };
  const updateTaskStatus = async (taskId, status) => {
    const canStart = await canTaskStart(taskId);
  
    if (
      status === "IN_PROGRESS" &&
      !canStart
    ) {
      throw new Error(
        "Task blocked by incomplete dependencies"
      );
    }
  
    let startedAt = null;
    let completedAt = null;
  
    if (status === "IN_PROGRESS") {
      startedAt = new Date();
    }
  
    if (status === "COMPLETED") {
      completedAt = new Date();
    }
  
    const result = await pool.query(
      `
      UPDATE operational_tasks
      SET
        status = $1,
        started_at = COALESCE($2, started_at),
        completed_at = COALESCE($3, completed_at)
      WHERE id = $4
      RETURNING *
      `,
      [
        status,
        startedAt,
        completedAt,
        taskId,
      ]
    );
    global.io.emit("task.updated", {
        task: result.rows[0],
      });
    return result.rows[0];
  };
  module.exports = {
    createTask,
    getTasksByTurnaround,
    addDependency,
    canTaskStart,
    updateTaskStatus,
  };