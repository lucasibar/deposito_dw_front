import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { normalizeText } from '../../../shared/lib/utils/dateUtils';

export const usePosicionFilter = (searchTerms = [], filters = {}) => {
  const { posiciones, loading, error } = useSelector(state => state.posiciones);

  const filteredData = useMemo(() => {
    // Primero aplicar los filtros de posición
    let filteredByPosition = posiciones.filter(posicion => {
      // Si no hay filtros activos, mostrar todas las posiciones que no están en cuarentena
      if (!filters.rack && !filters.fila && !filters.nivel && !filters.pasillo) {
        return !posicion.entrada;
      }

      // Aplicar filtros
      const rackMatch = !filters.rack || posicion.rack === parseInt(filters.rack);
      const filaMatch = !filters.fila || posicion.fila === parseInt(filters.fila);
      const nivelMatch = !filters.nivel || posicion.AB === filters.nivel;
      const pasilloMatch = !filters.pasillo || posicion.pasillo === parseInt(filters.pasillo);

      return rackMatch && filaMatch && nivelMatch && pasilloMatch && !posicion.entrada;
    });

    // Luego aplicar la búsqueda por texto si hay términos
    if (searchTerms.length) {
      return searchTerms.reduce((filteredPosiciones, term) => {
        const normalizedTerm = normalizeText(term);
        
        return filteredPosiciones.map(posicion => {
          const filteredItems = posicion.items.filter(item => 
            normalizeText(item.proveedor.nombre)?.includes(normalizedTerm) ||
            normalizeText(item.descripcion)?.includes(normalizedTerm) ||
            normalizeText(item.categoria)?.includes(normalizedTerm) ||
            normalizeText(item.partida)?.includes(normalizedTerm)
          );
          
          if (filteredItems.length > 0) {
            return {
              ...posicion,
              items: filteredItems
            };
          }
          return null;
        }).filter(Boolean);
      }, filteredByPosition);
    }

    return filteredByPosition;
  }, [posiciones, searchTerms, filters]);

  const chartData = useMemo(() => {
    // Agrupar por categorías
    const stockData = filteredData.reduce((acc, posicion) => {
      posicion.items.forEach(item => {
        const categoria = item.categoria;
        
        if (!acc[categoria]) {
          acc[categoria] = {
            categoria,
            kilos: 0,
            unidades: 0
          };
        }

        acc[categoria].kilos += item.kilos || 0;
        acc[categoria].unidades += item.unidades || 0;
      });

      return acc;
    }, {});

    return Object.values(stockData);
  }, [filteredData]);

  return {
    filteredData,
    chartData,
    loading,
    error
  };
}; 