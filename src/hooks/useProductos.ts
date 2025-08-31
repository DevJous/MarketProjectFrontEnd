import { useState, useEffect } from "react";
import type ProductoModel from "../models/ProductoModel";
import Swal from 'sweetalert2'
import { toast } from "react-toastify";

export function useProductos() {
    const [productos, setProductos] = useState<ProductoModel[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchProductos = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.API_URL}/products/all`);
            const data = await res.json();
            setProductos(data);
        } catch (err) {
            console.error("Error cargando productos:", err);
        } finally {
            setLoading(false);
        }
    };

    const crearProducto = async (nuevoProducto: ProductoModel) => {
        if(nuevoProducto.nombre.trim() === '' || nuevoProducto.precio <= 0 || nuevoProducto.idCategoria === 0){
            toast.error("Nombre, precio y categoría son obligatorios");
            return;
        }

        try {
            await fetch(`${process.env.API_URL}/products/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoProducto),
            });
            Swal.fire({
                title: "Producto creado",
                text: "Se ha creado el producto exitosamente.",
                icon: "success"
            });
            fetchProductos(); // refresca lista
        } catch (err) {
            console.error("Error creando producto:", err);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    return { productos, loading, crearProducto, fetchProductos };
}
