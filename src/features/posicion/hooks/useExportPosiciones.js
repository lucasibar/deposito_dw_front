import * as XLSX from 'xlsx';

/**
 * Hook para exportar posiciones a Excel
 * @param {Array} posiciones - Array de posiciones a exportar
 * @returns {Function} Función para exportar las posiciones
 */
export const useExportPosiciones = () => {
  const exportToExcel = (posiciones) => {
    if (!posiciones || posiciones.length === 0) {
      console.warn('No hay posiciones para exportar');
      return;
    }

    const data = posiciones.map(posicion => ({
      'Rack': posicion.rack,
      'Fila': posicion.fila,
      'Nivel': posicion.AB,
      'Pasillo': posicion.pasillo,
      'Estado': posicion.entrada ? 'En Cuarentena' : 'Disponible',
      'Items': posicion.items.length
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Posiciones');
    XLSX.writeFile(wb, 'posiciones.xlsx');
  };

  return { exportToExcel };
}; 