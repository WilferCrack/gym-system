const routineModel = require("../models/routineModel");

const createRoutine = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Acceso denegado" });
  }

  const { client_id, name, exercises } = req.body;

  if (!client_id || !name || !exercises || exercises.length === 0) {
    return res
      .status(400)
      .json({ error: "Faltan datos (cliente, nombre o ejercicios)" });
  }

  try {
    const newRoutine = await routineModel.createRoutine(
      client_id,
      name,
      exercises
    );
    res.status(201).json({
      message: "Rutina asignada exitosamente",
      routine: newRoutine,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la rutina" });
  }
};

const getMyRoutines = async (req, res) => {
  const userId = req.user.id;

  try {
    const routines = await routineModel.getRoutinesByClient(userId);
    res.json(routines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener rutinas" });
  }
};

module.exports = { createRoutine, getMyRoutines };
