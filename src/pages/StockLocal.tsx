import { useState } from "react";
import { useLocals } from "../hooks/useLocals";
import { useProductos } from "../hooks/useProductos";
import { useStockLocal } from "../hooks/useStockLocal";

export default function StockLocalPage() {
  const { locales } = useLocals();
  const { productos } = useProductos();
  const { asignaciones, loading, asignarProducto, actualizarStock, registrarVenta } = useStockLocal();

  const [form, setForm] = useState({
    idLocal: "",
    idProducto: "",
    stock: "",
  });

  const [updateData, setUpdateData] = useState({});

  const handleSubmit = () => {
    asignarProducto(form.idProducto, form.idLocal, parseInt(form.stock));
    setForm({ idLocal: "", idProducto: "", stock: "" });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🔗 Asignación y Gestión de Stock</h1>

      <div className="card bg-base-100 shadow-md mb-8">
        <div className="card-body">
          <h2 className="card-title">Asignar Producto a Local</h2>
          <div className="grid grid-cols-3 gap-4">
            <select
              className="select select-bordered w-full"
              value={form.idLocal}
              onChange={(e) => setForm({ ...form, idLocal: e.target.value })}
            >
              <option value="">Selecciona Local</option>
              {locales.map((l) => (
                <option key={l.idLocal} value={l.idLocal}>
                  {l.nombre}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered w-full"
              value={form.idProducto}
              onChange={(e) => setForm({ ...form, idProducto: e.target.value })}
            >
              <option value="">Selecciona Producto</option>
              {productos.map((p) => (
                <option key={p.idProducto} value={p.idProducto}>
                  {p.nombre}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Stock inicial"
              className="input input-bordered w-full"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
          </div>
          <div className="card-actions justify-end mt-4">
            <button onClick={handleSubmit} className="btn btn-primary">
              Asignar
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center">⏳ Cargando asignaciones...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Local</th>
                <th>Producto</th>
                <th>Stock</th>
                <th>Ventas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {asignaciones.map((a) => (
                <tr key={a.idStock}>
                  <td>{a.idStock}</td>
                  <td>{a.local}</td>
                  <td>{a.producto}</td>
                  <td>
                    <input
                      type="number"
                      className="input input-bordered w-24"
                      value={updateData[a.idStock]?.stock ?? a.stock}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          [a.idStock]: {
                            ...updateData[a.idStock],
                            stock: e.target.value,
                          },
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="input input-bordered w-24"
                      value={updateData[a.idStock]?.ventas ?? 0}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          [a.idStock]: {
                            ...updateData[a.idStock],
                            ventas: e.target.value,
                          },
                        })
                      }
                    />
                  </td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() =>
                        actualizarStock(
                          a.idProducto,
                          a.idLocal,
                          parseInt(updateData[a.idStock]?.stock ?? a.stock)
                        )
                      }
                    >
                      Actualizar Stock
                    </button>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() =>
                        registrarVenta(
                          a.idProducto,
                          a.idLocal,
                          parseInt(updateData[a.idStock]?.ventas ?? 0)
                        )
                      }
                    >
                      Registrar Venta
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
