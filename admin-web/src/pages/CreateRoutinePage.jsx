import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const CreateRoutinePage = () => {
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [availableExercises, setAvailableExercises] = useState([]);

  const [selectedClient, setSelectedClient] = useState("");
  const [routineName, setRoutineName] = useState("");

  const [routineExercises, setRoutineExercises] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsRes = await api.get("/auth/clients");
        const exercisesRes = await api.get("/exercises");
        setClients(clientsRes.data);
        setAvailableExercises(exercisesRes.data);
      } catch (error) {
        console.error("Error cargando datos iniciales", error);
      }
    };
    fetchData();
  }, []);

  const addExerciseRow = () => {
    setRoutineExercises([
      ...routineExercises,
      { exercise_id: "", sets: 4, reps: "", notes: "" },
    ]);
  };

  const removeExerciseRow = (index) => {
    const updated = [...routineExercises];
    updated.splice(index, 1);
    setRoutineExercises(updated);
  };

  const handleRowChange = (index, field, value) => {
    const updated = [...routineExercises];
    updated[index][field] = value;
    setRoutineExercises(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClient || !routineName || routineExercises.length === 0) {
      alert(
        "Por favor completa todos los campos y agrega al menos un ejercicio."
      );
      return;
    }

    const payload = {
      client_id: selectedClient,
      name: routineName,
      exercises: routineExercises,
    };

    try {
      await api.post("/routines", payload);
      alert("¡Rutina asignada exitosamente! 💪");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Error al crear la rutina.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Nueva Rutina Personalizada
          </h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-600 hover:underline"
          >
            Cancelar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded border">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Cliente
              </label>
              <select
                className="w-full p-2 border rounded"
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                required
              >
                <option value="">-- Seleccionar Cliente --</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name} ({client.email})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Nombre de la Rutina
              </label>
              <input
                className="w-full p-2 border rounded"
                placeholder="Ej: Hipertrofia Fase 1"
                value={routineName}
                onChange={(e) => setRoutineName(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Ejercicios de la Rutina
            </h3>

            {routineExercises.map((row, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-2 mb-4 items-end bg-blue-50 p-3 rounded border border-blue-100"
              >
                <div className="flex-grow">
                  <label className="text-xs font-bold text-gray-500">
                    Ejercicio
                  </label>
                  <select
                    className="w-full p-2 border rounded bg-white"
                    value={row.exercise_id}
                    onChange={(e) =>
                      handleRowChange(index, "exercise_id", e.target.value)
                    }
                    required
                  >
                    <option value="">Seleccionar...</option>
                    {availableExercises.map((ex) => (
                      <option key={ex.id} value={ex.id}>
                        {ex.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-20">
                  <label className="text-xs font-bold text-gray-500">
                    Series
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={row.sets}
                    onChange={(e) =>
                      handleRowChange(index, "sets", e.target.value)
                    }
                  />
                </div>

                <div className="w-32">
                  <label className="text-xs font-bold text-gray-500">
                    Reps
                  </label>
                  <input
                    className="w-full p-2 border rounded"
                    placeholder="Ej: 10-12"
                    value={row.reps}
                    onChange={(e) =>
                      handleRowChange(index, "reps", e.target.value)
                    }
                  />
                </div>

                <div className="flex-grow">
                  <label className="text-xs font-bold text-gray-500">
                    Notas
                  </label>
                  <input
                    className="w-full p-2 border rounded"
                    placeholder="Ej: Bajar lento..."
                    value={row.notes}
                    onChange={(e) =>
                      handleRowChange(index, "notes", e.target.value)
                    }
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeExerciseRow(index)}
                  className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addExerciseRow}
              className="mt-2 text-blue-600 font-bold hover:underline flex items-center"
            >
              + Agregar otro ejercicio
            </button>
          </div>

          <hr />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 shadow-lg transform transition hover:scale-[1.01]"
          >
            💾 Guardar y Asignar Rutina
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoutinePage;
