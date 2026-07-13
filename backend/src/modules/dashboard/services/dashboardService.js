const pool = require("../../../db/db");

const getDashboardMetrics = async () => {
  const activeTurnarounds = await pool.query(`
    SELECT COUNT(*) AS count
    FROM turnarounds
    WHERE status != 'DEPARTED'
  `);

  const delayedTasks = await pool.query(`
    SELECT COUNT(*) AS count
    FROM operational_tasks
    WHERE status = 'DELAYED'
  `);

  const completedTasks = await pool.query(`
    SELECT COUNT(*) AS count
    FROM operational_tasks
    WHERE status = 'COMPLETED'
  `);

  const totalTasks = await pool.query(`
    SELECT COUNT(*) AS count
    FROM operational_tasks
  `);

  const recentTurnarounds = await pool.query(`
    SELECT *
    FROM turnarounds
    ORDER BY created_at DESC
    LIMIT 10
  `);

  const completionRate =
    totalTasks.rows[0].count == 0
      ? 0
      : (
          (completedTasks.rows[0].count /
            totalTasks.rows[0].count) *
          100
        ).toFixed(2);

  return {
    active_turnarounds:
      activeTurnarounds.rows[0].count,

    delayed_tasks:
      delayedTasks.rows[0].count,

    completed_tasks:
      completedTasks.rows[0].count,

    total_tasks:
      totalTasks.rows[0].count,

    completion_rate: completionRate,

    recent_turnarounds:
      recentTurnarounds.rows,
  };
};

module.exports = {
  getDashboardMetrics,
};