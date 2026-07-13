const pool = require("../../../db/db");

const createTurnaround = async (data) => {
  const {
    flight_number,
    aircraft_registration,
    airline,
    gate_number,
    arrival_time,
    scheduled_departure,
    assigned_supervisor,
  } = data;

  const result = await pool.query(
    `
    INSERT INTO turnarounds (
      flight_number,
      aircraft_registration,
      airline,
      gate_number,
      arrival_time,
      scheduled_departure,
      assigned_supervisor
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *
    `,
    [
      flight_number,
      aircraft_registration,
      airline,
      gate_number,
      arrival_time,
      scheduled_departure,
      assigned_supervisor,
    ]
  );

  return result.rows[0];
};

const getAllTurnarounds = async () => {
  const result = await pool.query(`
    SELECT *
    FROM turnarounds
    ORDER BY created_at DESC
  `);

  return result.rows;
};

module.exports = {
  createTurnaround,
  getAllTurnarounds,
};