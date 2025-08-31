import { useEffect, useState } from "react";
import type CategoriaModel from "../models/CategoriaModel";

export function useCategorias() {
    const [categorias, setCategorias] = useState<CategoriaModel[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchCategorias = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.API_URL}/categories/all`);
            const data = await res.json();
            setCategorias(data);
        } catch (err) {
            console.error("Error cargando productos:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    return { categorias, loading, fetchCategorias };
}