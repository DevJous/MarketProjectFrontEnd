import { useState, useEffect } from "react";
import type { LocalModel } from "../models/LocalModel";
import Swal from 'sweetalert2'
import { toast } from "react-toastify";

export function useLocals() {
  const [locales, setLocales] = useState<LocalModel[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLocals = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.API_URL}/locals/all`);
      const data = await res.json();
      setLocales(data);
    } catch (err) {
      console.error("Error cargando locales:", err);
    } finally {
      setLoading(false);
    }
  };

  const crearLocal = async (nuevoLocal:LocalModel) => {
    if(nuevoLocal.nombre.trim() === '' || nuevoLocal.direccion.trim() === ''){
      toast.error("El nombre y la dirección son obligatorios");
      return;
    }

    try {
      await fetch(`${process.env.API_URL}/locals/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoLocal),
      });
      Swal.fire({
                      title: "Local registrado",
                      text: "Se ha registrado el local exitosamente.",
                      icon: "success"
                  });
      fetchLocals();
    } catch (err) {
      console.error("Error creando local:", err);
    }
  };

  useEffect(() => {
    fetchLocals();
  }, []);

  return { locales, loading, crearLocal, fetchLocales: fetchLocals };
}
