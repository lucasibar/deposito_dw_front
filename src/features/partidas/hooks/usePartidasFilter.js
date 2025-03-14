import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectPartidas, selectStatus } from '../model/selectors';

export const usePartidasFilter = (searchTerms = [], estado = '') => {
  const partidas = useSelector(selectPartidas);
  const status = useSelector(selectStatus);

  const filteredData = useMemo(() => {
    if (!partidas || !Array.isArray(partidas)) return [];

    // Primero filtramos por estado
    let filtered = partidas.filter(partida => partida.estado === estado);

    // Si hay términos de búsqueda, aplicamos el filtro
    if (searchTerms.length > 0) {
      filtered = filtered.filter(partida => {
        const searchableText = `${partida.numeroPartida} ${partida.descripcionItem} ${partida.proveedor} ${partida.categoria} ${partida.material}`.toLowerCase();
        return searchTerms.every(term => searchableText.includes(term));
      });
    }

    // Ordenamos por fecha
    return filtered.sort((a, b) => {
      const fechaA = new Date(a.fecha.split('-').reverse().join('-'));
      const fechaB = new Date(b.fecha.split('-').reverse().join('-'));
      return fechaA - fechaB;
    });
  }, [partidas, searchTerms, estado]);

  return {
    filteredData,
    loading: status === 'loading',
    error: status === 'failed'
  };
}; 