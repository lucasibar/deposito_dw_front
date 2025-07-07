import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosiciones } from '../../features/posicion/model/slice';
import { usePosicionFilter } from '../../features/posicion/hooks/usePosicionFilter';
import { useExportPosiciones } from '../../features/posicion/hooks/useExportPosiciones';
import { SearchPosition } from '../../widgets/posicion/SearchPosition/SearchPosition';
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

  React.useEffect(() => {
    dispatch(fetchPosiciones());
  }, [dispatch]);

  const handlePositionSearch = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className={styles.container}>
      <Title>Posiciones</Title>
      <SearchPosition onSearch={handlePositionSearch} />
      
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