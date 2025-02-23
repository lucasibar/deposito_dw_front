import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { normalizeText } from '../../../shared/lib/utils/dateUtils';

export const useStockFilter = (searchTerms = []) => {
  const { posiciones, loading, error } = useSelector(state => state.stock);

  const filteredData = useMemo(() => {
    if (!searchTerms.length) return posiciones;

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
    }, posiciones);
  }, [posiciones, searchTerms]);

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