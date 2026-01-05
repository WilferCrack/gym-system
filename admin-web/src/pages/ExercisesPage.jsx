import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const ExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    video_url: "",
    muscle_group: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await api.get("/exercises");
        setExercises(response.data);
      } catch (error) {
        console.error("Error cargando ejercicios", error);
      }
    };

    fetchExercises();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/exercises", form);
      setExercises([...exercises, response.data]);
      setForm({ name: "", description: "", video_url: "", muscle_group: "" });
      alert("Ejercicio creado con éxito");
    } catch (error) {
      console.error("Error creando ejercicio", error);
      alert("Error creando ejercicio (quizás no eres admin)");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Biblioteca de Ejercicios 📚
        </h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-600 hover:underline"
        >
          ← Volver al Panel
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Nuevo Ejercicio
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full p-2 border rounded"
              placeholder="Nombre (Ej: Press Banca)"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Descripción breve..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <input
              className="w-full p-2 border rounded"
              placeholder="URL del Video (Youtube/Vimeo)"
              value={form.video_url}
              onChange={(e) => setForm({ ...form, video_url: e.target.value })}
            />
            <select
              className="w-full p-2 border rounded bg-white"
              value={form.muscle_group}
              onChange={(e) =>
                setForm({ ...form, muscle_group: e.target.value })
              }
            >
              <option value="">Selecciona Grupo Muscular</option>
              <option value="Pecho">Pecho</option>
              <option value="Espalda">Espalda</option>
              <option value="Piernas">Piernas</option>
              <option value="Brazos">Brazos</option>
              <option value="Hombros">Hombros</option>
              <option value="Cardio">Cardio</option>
            </select>
            <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-bold">
              + Agregar Ejercicio
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {exercises.map((ex) => (
            <div
              key={ex.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-gray-800">{ex.name}</h3>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {ex.muscle_group}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-2">{ex.description}</p>
              {ex.video_url && (
                <a
                  href={ex.video_url}
                  target="_blank"
                  rel="noreferrer"
                  className="block mt-4 text-blue-500 text-sm hover:underline"
                >
                  🎥 Ver Video Explicativo
                </a>
              )}
            </div>
          ))}

          {exercises.length === 0 && (
            <p className="text-gray-500 italic col-span-2 text-center py-10">
              No hay ejercicios cargados aún.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExercisesPage;
