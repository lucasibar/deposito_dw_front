import React from 'react';
import { CustomLineChart } from '../../../shared/ui/LineChart/LineChart';
    
export const InformeConsumo = ({ chartData, loading, error }) => {
  return (
    <CustomLineChart 
      data={chartData}
      xAxisKey="fecha"
      yAxisKey="consumo"
      xAxisLabel="Fecha"
      yAxisLabel="Consumo (kg)"
      title="Historial de Consumo - Últimos 30 días"
      loading={loading}
      error={error}
    />
  );
}; 