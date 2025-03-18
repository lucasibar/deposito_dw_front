import React, { useMemo } from 'react';
import { CustomLineChart } from '../../../shared/ui/LineChart/LineChart';

export const InformeConsumo = ({ chartData, loading, error }) => {
  // Procesar y filtrar los datos para el último mes
  const processedData = useMemo(() => {
    if (!chartData || !Array.isArray(chartData)) {
      console.log('chartData no válido:', chartData);
      return [];
    }

    console.log('chartData original:', chartData);

    // Ordenar los datos por fecha
    const sortedData = [...chartData].sort((a, b) => {
      const dateA = new Date(a.fecha);
      const dateB = new Date(b.fecha);
      return dateA - dateB;
    });

    console.log('Datos ordenados:', sortedData);

    // Obtener los últimos 30 días
    const last30Days = sortedData.slice(-30);
    console.log('Últimos 30 días:', last30Days);

    return last30Days;
  }, [chartData]);

  return (
    <CustomLineChart 
      data={processedData}
      xAxisKey="fecha"
      yAxisKey="consumo"
      xAxisLabel="Fecha"
      yAxisLabel="Consumo (kg)"
      title="Historial de Consumo - Último mes"
      loading={loading}
      error={error}
    />
  );
}; 