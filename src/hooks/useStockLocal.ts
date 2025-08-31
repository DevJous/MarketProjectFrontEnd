import { useState, useEffect } from "react";
import type { StockLocalModel } from "../models/StockLocalModel";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export function useStockLocal() {
    const [asignaciones, setAsignaciones] = useState<StockLocalModel[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchAsignaciones = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.API_URL}/stock/all`);
            const data = await res.json();
            setAsignaciones(data);
        } catch (err) {
            console.error("Error cargando asignaciones:", err);
        } finally {
            setLoading(false);
        }
    };

    const asignarProducto = async (idProducto, idLocal, stock) => {
        if (idProducto == 0 || idLocal == 0 || stock <= 0) {
            toast.error("Seleccione correctamente la información necesaria.");
            return;
        }

        try {
            await fetch(`${process.env.API_URL}/stock/assign`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idProducto, idLocal, stock }),
            });
            fetchAsignaciones();
        } catch (err) {
            console.error("Error asignando producto:", err);
        }
    };

    const actualizarStock = async (idProducto, idLocal, stock) => {
        try {
            await fetch(`${process.env.API_URL}/stock/setstock`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idProducto, idLocal, stock }),
            });

            Swal.fire({
                title: "Stock actualizado",
                text: "Se ha actualizado el stock del producto.",
                icon: "success"
            });
            fetchAsignaciones();
        } catch (err) {
            console.error("Error actualizando stock:", err);
        }
    };

    const registrarVenta = async (idProducto, idLocal, venta) => {
        if (venta <= 0) {
            toast.error("La cantidad de la venta debe ser mayor a 0.");
            return;
        }

        try {
            await fetch(`${process.env.API_URL}/stock/setsell`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idProducto, idLocal, venta, stock: 0 }),
            });

            Swal.fire({
                title: "Venta registrada",
                text: "Se ha registrado las ventas del producto.",
                icon: "success"
            });
            fetchAsignaciones();
        } catch (err) {
            console.error("Error registrando venta:", err);
        }
    };

    useEffect(() => {
        fetchAsignaciones();
    }, []);

    return { asignaciones, loading, asignarProducto, actualizarStock, registrarVenta };
}
