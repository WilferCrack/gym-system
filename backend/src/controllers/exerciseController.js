const exerciseModel = require("../models/exerciseModel");

const getExercises = async (req, res) => {
  try {
    const exercises = await exerciseModel.getAllExercises();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener ejercicios" });
  }
};

const createExercise = async (req, res) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Solo los administradores pueden crear ejercicios" });
  }

  const { name, description, video_url, muscle_group } = req.body;

  try {
    const newExercise = await exerciseModel.createExercise(
      name,
      description,
      video_url,
      muscle_group
    );
    res.status(201).json(newExercise);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el ejercicio" });
  }
};

module.exports = { getExercises, createExercise };
