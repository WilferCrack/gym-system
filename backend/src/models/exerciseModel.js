const pool = require("../config/db");

const getAllExercises = async () => {
  const result = await pool.query("SELECT * FROM exercises ORDER BY name ASC");
  return result.rows;
};

const createExercise = async (name, description, video_url, muscle_group) => {
  const query = `
    INSERT INTO exercises (name, description, video_url, muscle_group)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [name, description, video_url, muscle_group];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { getAllExercises, createExercise };
