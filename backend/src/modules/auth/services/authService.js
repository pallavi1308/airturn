const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pool = require("../../../db/db");
const env = require("../../../config/env");

const registerUser = async (userData) => {
  const { full_name, email, password } = userData;

  const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
    INSERT INTO users (full_name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, full_name, email, role
    `,
    [full_name, email, hashedPassword]
  );

  return result.rows[0];
};

const loginUser = async (userData) => {
  const { email, password } = userData;

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = result.rows[0];

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
    },
  };
};

module.exports = {
  registerUser,
  loginUser,
};