const pool = require("../../../db/db");

const createHandover = async (data) => {
  const { notes, supervisor_comment, created_by } = data;

  const result = await pool.query(
    `INSERT INTO shift_handovers
     (notes, supervisor_comment, created_by)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [notes, supervisor_comment, created_by]
  );

  global.io.emit("handover.created", result.rows[0]);

  return result.rows[0];
};

const getHandovers = async () => {
  const result = await pool.query(
    `SELECT * FROM shift_handovers
     ORDER BY created_at DESC`
  );

  return result.rows;
};

module.exports = {
  createHandover,
  getHandovers,
};