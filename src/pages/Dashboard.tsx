import { useMemo } from "react";
import { useDashboard } from "../hooks/useDashboard";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const COLORS = ['#36d399', '#3abff8', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export default function DashboardPage() {
  const { data, loading } = useDashboard();

  // Cálculos memoizados para optimizar rendimiento
  const metrics = useMemo(() => {
    if (!data?.length) return { totalStock: 0, totalVentas: 0, stockBajo: 0, topProductos: [] };

    const totalStock = data.reduce((sum, d) => sum + (d.stock || 0), 0);
    const totalVentas = data.reduce((sum, d) => sum + (d.ventas || 0), 0);
    const stockBajo = data.filter(d => (d.stock || 0) < 10).length;

    // Top productos por ventas
    const topProductos = data
      .sort((a, b) => (b.ventas || 0) - (a.ventas || 0))
      .slice(0, 5)
      .map(item => ({
        ...item,
        nombre: item.producto || item.producto || 'Sin nombre'
      }));

    return { totalStock, totalVentas, stockBajo, topProductos };
  }, [data]);

 
  const chartData = useMemo(() => {
    if (!data?.length) return [];
    
    const productMap = new Map();
    
    data.forEach(item => {
      const key = item.producto || item.producto || 'Sin nombre';
      if (productMap.has(key)) {
        const existing = productMap.get(key);
        existing.stock += (item.stock || 0);
        existing.ventas += (item.ventas || 0);
      } else {
        productMap.set(key, {
          nombre: key,
          stock: item.stock || 0,
          ventas: item.ventas || 0
        });
      }
    });
    
    return Array.from(productMap.values());
  }, [data]);

  // Estados de carga y error
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6">
          <div className="loading loading-spinner loading-lg mb-4"></div>
          <p className="text-lg">Cargando Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="alert alert-info max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>No hay datos disponibles</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">📊 Dashboard de Inventario</h1>
        <div className="text-sm opacity-70">
          Última actualización: {new Date().toLocaleString('es-ES')}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stats shadow bg-gradient-to-r from-primary to-primary-focus">
          <div className="stat text-primary-content">
            <div className="stat-figure">
              <div className="text-3xl opacity-80">📦</div>
            </div>
            <div className="stat-title text-primary-content/70">Total Stock</div>
            <div className="stat-value">{metrics.totalStock.toLocaleString()}</div>
          </div>
        </div>

        <div className="stats shadow bg-gradient-to-r from-success to-success-focus">
          <div className="stat text-success-content">
            <div className="stat-figure">
              <div className="text-3xl opacity-80">💰</div>
            </div>
            <div className="stat-title text-success-content/70">Total Ventas</div>
            <div className="stat-value">{metrics.totalVentas.toLocaleString()}</div>
          </div>
        </div>

        <div className="stats shadow bg-gradient-to-r from-warning to-warning-focus">
          <div className="stat text-warning-content">
            <div className="stat-figure">
              <div className="text-3xl opacity-80">⚠️</div>
            </div>
            <div className="stat-title text-warning-content/70">Stock Bajo</div>
            <div className="stat-value">{metrics.stockBajo}</div>
            <div className="stat-desc text-warning-content/70">Productos &lt; 10 unidades</div>
          </div>
        </div>

        <div className="stats shadow bg-gradient-to-r from-info to-info-focus">
          <div className="stat text-info-content">
            <div className="stat-figure">
              <div className="text-3xl opacity-80">🏪</div>
            </div>
            <div className="stat-title text-info-content/70">Productos</div>
            <div className="stat-value">{chartData.length}</div>
            <div className="stat-desc text-info-content/70">Total registrados</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">📈 Ventas vs Stock por Producto</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.slice(0, 10)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="nombre" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--b1))', 
                      border: '1px solid hsl(var(--bc) / 0.2)',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="ventas" fill="#36d399" name="Ventas" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="stock" fill="#3abff8" name="Stock" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">🏆 Top 5 Productos por Ventas</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={metrics.topProductos}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ nombre, percent }) => `${nombre} (${(percent! * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="ventas"
                  >
                    {metrics.topProductos.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--b1))', 
                      border: '1px solid hsl(var(--bc) / 0.2)',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">📋 Detalle Completo</h2>
            <div className="badge badge-neutral">{data.length} registros</div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th className="text-left">🏪 Local</th>
                  <th className="text-left">📦 Producto</th>
                  <th className="text-center">📊 Stock</th>
                  <th className="text-center">💰 Ventas</th>
                  <th className="text-center">📈 Estado</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d, i) => (
                  <tr key={i} className="hover">
                    <td>
                      <div className="font-semibold">{d.local || 'Sin especificar'}</div>
                    </td>
                    <td>
                      <div className="font-medium">{d.producto || d.producto || 'Sin nombre'}</div>
                    </td>
                    <td className="text-center">
                      <div className={`badge ${(d.stock || 0) < 10 ? 'badge-warning' : 'badge-success'}`}>
                        {(d.stock || 0).toLocaleString()}
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="font-semibold">{(d.ventas || 0).toLocaleString()}</div>
                    </td>
                    <td className="text-center">
                      {(d.stock || 0) < 10 ? (
                        <div className="badge badge-warning gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Bajo
                        </div>
                      ) : (
                        <div className="badge badge-success gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          OK
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}