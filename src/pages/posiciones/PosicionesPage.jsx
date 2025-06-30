import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosiciones } from '../../features/posicion/model/slice';
import { usePosicionFilter } from '../../features/posicion/hooks/usePosicionFilter';
import { useExportPosiciones } from '../../features/posicion/hooks/useExportPosiciones';
import { SearchPosition } from '../../shared/ui/SearchPosition/SearchPosition';
import { ItemList } from '../../widgets/stock/ItemList/ItemList';
import styles from './PosicionesPage.module.css';
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
  const { exportToExcel } = useExportPosiciones();

  React.useEffect(() => {
    dispatch(fetchPosiciones());
  }, [dispatch]);

  const handlePositionSearch = (newFilters) => {
    setFilters(newFilters);
  };

  const handleExport = () => {
    exportToExcel(filteredData);
  };

  return (
    <div className={styles.container}>
      <Title>Posiciones</Title>
      <div className={styles.controls}>
        <SearchPosition onSearch={handlePositionSearch} />
        <button onClick={handleExport} className={styles.exportButton}>
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