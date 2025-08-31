import { useState, useEffect } from "react";
import type { StockLocalModel } from "../models/StockLocalModel";

export function useDashboard() {
  const [data, setData] = useState<StockLocalModel[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.API_URL}/stock/all`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error cargando dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return { data, loading };
}
