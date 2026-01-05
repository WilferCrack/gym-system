import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Panel de Control</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Hola, {user.name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Bienvenido al sistema</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/create-routine"
            className="bg-white p-6 rounded shadow hover:shadow-lg transition cursor-pointer border-l-4 border-green-500"
          >
            <h3 className="text-xl font-bold mb-2">📋 Asignar Rutina</h3>
            <p className="text-gray-600">
              Crear plan de entrenamiento y asignarlo a un cliente.
            </p>
          </Link>

          <div className="bg-white p-6 rounded shadow opacity-50 border-l-4 border-gray-300">
            <h3 className="text-xl font-bold mb-2">📋 Rutinas</h3>
            <p className="text-gray-600">
              Asignar planes de entrenamiento a clientes (Pronto).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
