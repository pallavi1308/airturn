const pool = require("../../../db/db");

const createIncident = async (data) => {
  const { title, description, flight, gate, severity, category, reporter_id } =
    data;

  const result = await pool.query(
    `
    INSERT INTO incidents (
      title, description, flight, gate, severity, category, reporter_id
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `,
    [title, description, flight, gate, severity, category, reporter_id]
  );

  global.io?.emit("incident.created", { incident: result.rows[0] });
  return result.rows[0];
};

const getAllIncidents = async (filters = {}) => {
  const { status, severity, category } = filters;
  let query = "SELECT * FROM incidents WHERE 1=1";
  const params = [];

  if (status) {
    params.push(status);
    query += ` AND status = $${params.length}`;
  }
  if (severity) {
    params.push(severity);
    query += ` AND severity = $${params.length}`;
  }
  if (category) {
    params.push(category);
    query += ` AND category = $${params.length}`;
  }

  query += " ORDER BY created_at DESC";
  const result = await pool.query(query, params);
  return result.rows;
};

const updateIncidentStatus = async (id, status, resolver_id) => {
  const resolvedAt =
    status === "RESOLVED" || status === "CLOSED" ? new Date() : null;

  const result = await pool.query(
    `
    UPDATE incidents
    SET status = $1,
        resolved_at = COALESCE($2, resolved_at),
        resolver_id = COALESCE($3, resolver_id)
    WHERE id = $4
    RETURNING *
    `,
    [status, resolvedAt, resolver_id, id]
  );

  global.io?.emit("incident.updated", { incident: result.rows[0] });
  return result.rows[0];
};

const getIncidentById = async (id) => {
  const result = await pool.query("SELECT * FROM incidents WHERE id = $1", [
    id,
  ]);
  return result.rows[0] || null;
};

module.exports = {
  createIncident,
  getAllIncidents,
  updateIncidentStatus,
  getIncidentById,
};