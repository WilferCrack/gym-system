const pool = require("../config/db");

const createRoutine = async (client_id, name, exercisesList) => {
  const routineQuery = `
    INSERT INTO routines (client_id, name)
    VALUES ($1, $2)
    RETURNING id, name, client_id;
  `;
  const routineResult = await pool.query(routineQuery, [client_id, name]);
  const newRoutine = routineResult.rows[0];

  for (const exercise of exercisesList) {
    const detailQuery = `
      INSERT INTO routine_exercises (routine_id, exercise_id, sets, reps, notes)
      VALUES ($1, $2, $3, $4, $5);
    `;
    await pool.query(detailQuery, [
      newRoutine.id,
      exercise.exercise_id,
      exercise.sets,
      exercise.reps,
      exercise.notes,
    ]);
  }

  return newRoutine;
};

const getRoutinesByClient = async (client_id) => {
  const query = `
    SELECT 
      r.id as routine_id, r.name as routine_name, r.created_at,
      e.name as exercise_name, e.video_url,
      re.sets, re.reps, re.notes
    FROM routines r
    JOIN routine_exercises re ON r.id = re.routine_id
    JOIN exercises e ON re.exercise_id = e.id
    WHERE r.client_id = $1
    ORDER BY r.created_at DESC;
  `;
  const result = await pool.query(query, [client_id]);
  return result.rows;
};

module.exports = { createRoutine, getRoutinesByClient };
