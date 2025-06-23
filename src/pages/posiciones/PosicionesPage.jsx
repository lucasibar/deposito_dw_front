import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosiciones } from '../../features/posicion/model/slice';
import { usePosicionFilter } from '../../features/posicion/hooks/usePosicionFilter';
import { SearchPosition } from '../../shared/ui/SearchPosition/SearchPosition';
import { ItemList } from '../../widgets/stock/ItemList/ItemList';
import styles from './PosicionesPage.module.css';
import * as XLSX from 'xlsx';
import { Title } from '../../shared/ui/Title/Title';

export const PosicionesPage = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    rack: '',
    fila: '',
    nivel: '',
    pasillo: ''
  });
  const { filteredData, loading, error } = usePosicionFilter([], filters);

  React.useEffect(() => {
    dispatch(fetchPosiciones());
  }, [dispatch]);

  const handlePositionSearch = (newFilters) => {
    setFilters(newFilters);
  };

  const exportToExcel = () => {
    const data = filteredData.map(posicion => ({
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

  return (
    <div className={styles.container}>
      <Title>Posiciones</Title>
      <div className={styles.controls}>
        <SearchPosition onSearch={handlePositionSearch} />
        <button onClick={exportToExcel} className={styles.exportButton}>
          Exportar a Excel
        </button>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.listContainer}>
          <ItemList
            posiciones={filteredData}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}; 