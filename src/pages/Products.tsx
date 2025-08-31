import { useEffect, useState } from "react";
import { useProductos } from "../hooks/useProductos";
import type ProductoModel from "../models/ProductoModel";
import { useCategorias } from "../hooks/useCategorias";

export default function ProductsPage() {

    const { productos, loading, crearProducto } = useProductos();
    const { categorias } = useCategorias();
    const [nuevoProducto, setNuevoProducto] = useState<ProductoModel>({
        nombre: '',
        precio: 0,
        idCategoria: 0,
        idProducto: 0,
        fechaReg: '',
        nombreCategoria: ''
    });

    const handleSubmit = () => {
        crearProducto(nuevoProducto);
        setNuevoProducto({ nombre: '', precio: 0, idCategoria: 0, idProducto: 0, fechaReg: '', nombreCategoria: '' });
    };

    useEffect(() => {
        if (categorias.length > 0 && !nuevoProducto.idCategoria) {
            setNuevoProducto((prev) => ({
                ...prev,
                idCategoria: categorias[0].idCategoria,
            }));
        }
    }, [categorias]);

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">📦 Productos</h1>

            {/* Formulario */}
            <div className="card bg-base-100 shadow-md mb-8">
                <div className="card-body">
                    <h2 className="card-title">Agregar Producto</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-start">
                            <span>Nombre</span>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={nuevoProducto.nombre}
                                onChange={(e) =>
                                    setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
                                }
                            />
                        </div>
                        <div className="flex flex-col items-start">
                            <span>Precio</span>
                            <input
                                type="number"
                                min={0}
                                placeholder="Precio"
                                className="input input-bordered w-full"
                                value={nuevoProducto.precio}
                                onChange={(e) =>
                                    setNuevoProducto({ ...nuevoProducto, precio: Number(e.target.value) })
                                }
                            />
                        </div>
                        <div className="flex flex-col items-start">
                            <span>Categoría</span>
                            <select
                                className="select"
                                value={nuevoProducto.idCategoria}
                                onChange={(e) =>
                                    setNuevoProducto({ ...nuevoProducto, idCategoria: Number(e.target.value) })
                                }
                            >
                                {categorias.map((c) => (
                                    <option key={c.idCategoria} value={c.idCategoria}>
                                        {c.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="card-actions justify-end mt-4">
                        <button onClick={handleSubmit} className="btn btn-primary">
                            Guardar
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabla */}
            {loading ? (
                <div className="text-center">⏳ Cargando productos...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Categoría</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((p) => (
                                <tr key={p.idProducto}>
                                    <td>{p.idProducto}</td>
                                    <td>{p.nombre}</td>
                                    <td>${p.precio}</td>
                                    <td>{p.nombreCategoria}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
