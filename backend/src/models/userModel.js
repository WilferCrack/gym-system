const pool = require("../config/db");

const createUser = async (name, email, passwordHash, role = "client") => {
  const query = `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role, created_at;
  `;
  const values = [name, email, passwordHash, role];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

const getAllClients = async () => {
  const query =
    "SELECT id, name, email FROM users WHERE role = 'client' ORDER BY name ASC";
  const result = await pool.query(query);
  return result.rows;
};

module.exports = { createUser, getUserByEmail, getAllClients };
