import { useState } from "react";
import { useLocals } from "../hooks/useLocals";

export default function LocalsPage() {
  const { locales, loading, crearLocal } = useLocals();
  const [nuevoLocal, setNuevoLocal] = useState({
    nombre: "",
    direccion: "",
  });

  const handleSubmit = () => {
    crearLocal(nuevoLocal);
    setNuevoLocal({ nombre: "", direccion: "" });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🏬 Locales</h1>

      {/* Formulario */}
      <div className="card bg-base-100 shadow-md mb-8">
        <div className="card-body">
          <h2 className="card-title">Registrar Local</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre"
              className="input input-bordered w-full"
              value={nuevoLocal.nombre}
              onChange={(e) =>
                setNuevoLocal({ ...nuevoLocal, nombre: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Dirección"
              className="input input-bordered w-full"
              value={nuevoLocal.direccion}
              onChange={(e) =>
                setNuevoLocal({ ...nuevoLocal, direccion: e.target.value })
              }
            />
          </div>
          <div className="card-actions justify-end mt-4">
            <button onClick={handleSubmit} className="btn btn-primary">
              Guardar
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de locales */}
      {loading ? (
        <div className="text-center">⏳ Cargando locales...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Dirección</th>
              </tr>
            </thead>
            <tbody>
              {locales.map((l) => (
                <tr key={l.idLocal}>
                  <td>{l.idLocal}</td>
                  <td>{l.nombre}</td>
                  <td>{l.direccion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
