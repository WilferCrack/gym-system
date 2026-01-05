const express = require("express");
const cors = require("cors");
const pool = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const exerciseRoutes = require("./src/routes/exerciseRoutes");
const routineRoutes = require("./src/routes/routineRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/routines", routineRoutes);

app.get("/", (req, res) => {
  res.send("¡Servidor de Gym System funcionando!");
});

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      mensaje: "Servidor y Base de Datos conectados correctamente",
      tiempo: result.rows[0].now,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al conectar con la Base de Datos" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
