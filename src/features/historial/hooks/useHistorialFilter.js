import { useMemo } from 'react';
import { useSelector } from 'react-redux';

// Función para normalizar texto (quitar tildes y caracteres especiales)
const normalizeText = (text) => {
  return text?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Elimina diacríticos
    .toLowerCase()
    .trim();
};

// Función para obtener el número de semana de una fecha
const getWeekNumber = (fecha) => {
  const date = new Date(fecha);
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - firstDayOfYear) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + firstDayOfYear.getDay() + 1) / 7);
};

// Función para obtener el primer y último día de la semana
const getWeekRange = (fecha) => {
  const date = new Date(fecha);
  const day = date.getDay();
  
  // Obtener el primer día de la semana (lunes)
  const firstDay = new Date(date);
  firstDay.setDate(date.getDate() - day + (day === 0 ? -6 : 1));
  
  // Obtener el último día de la semana (domingo)
  const lastDay = new Date(firstDay);
  lastDay.setDate(firstDay.getDate() + 6);
  
  // Formatear las fechas como DD/MM
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
  };

  return `${formatDate(firstDay)} - ${formatDate(lastDay)}`;
};

// Función para generar la etiqueta de la semana
const getWeekLabel = (fecha) => {
  const date = new Date(fecha);
  const weekRange = getWeekRange(fecha);
  return `${weekRange} (${date.getFullYear()})`;
};

export const useHistorialFilter = (searchTerms = []) => {
  const { historialSalida, loading, error } = useSelector(state => state.historial);

  const filteredData = useMemo(() => {
    if (!searchTerms.length) return historialSalida;

    return searchTerms.reduce((filteredRemitos, term) => {
      const normalizedTerm = normalizeText(term);
      
      return filteredRemitos.map(remito => {
        const filteredItems = remito.items.filter(item => 
          normalizeText(item.proveedor)?.includes(normalizedTerm) ||
          normalizeText(item.descripcion)?.includes(normalizedTerm) ||
          normalizeText(item.categoria)?.includes(normalizedTerm) ||
          normalizeText(item.partida)?.includes(normalizedTerm)
        );

        if (filteredItems.length > 0) {
          return {
            ...remito,
            items: filteredItems
          };
        }
        return null;
      }).filter(Boolean);
    }, historialSalida);
  }, [historialSalida, searchTerms]);

  const chartData = useMemo(() => {
    // Agrupar por semanas
    const weeklyData = filteredData.reduce((acc, remito) => {
      const weekLabel = getWeekLabel(remito.fechaOriginal);
      
      if (!acc[weekLabel]) {
        acc[weekLabel] = {
          fecha: weekLabel,
          fechaOriginal: remito.fechaOriginal, // Guardamos la fecha original para ordenar
          consumo: 0
        };
      }

      acc[weekLabel].consumo += remito.items.reduce((total, item) => 
        total + (item.kilos || 0), 0
      );

      return acc;
    }, {});

    // Convertir a array y ordenar por fecha original
    return Object.values(weeklyData).sort((a, b) => {
      return a.fechaOriginal.localeCompare(b.fechaOriginal);
    });
  }, [filteredData]);

  return {
    filteredData,
    chartData,
    loading,
    error
  };
}; 