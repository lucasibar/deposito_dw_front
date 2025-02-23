import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Title } from '../../shared/ui/Title/Title';
import styles from './ComprasPage.module.css';
import { SearchBar } from '../../shared/ui/SearchBar/SearchBar';
import { InformeConsumo } from '../../widgets/historial/InformeConsumo/InformeConsumo';
import { RemitosSalidaList } from '../../widgets/historial/RemitosSalidaList/RemitosSalidaList';
import { fetchHistorialSalida } from '../../features/historial/model/slice';
import { useHistorialFilter } from '../../features/historial/hooks/useHistorialFilter';

export const ComprasPage = () => {
  const dispatch = useDispatch();
  const [searchTerms, setSearchTerms] = useState([]);
  const { filteredData, chartData, loading, error } = useHistorialFilter(searchTerms);

  useEffect(() => {
    dispatch(fetchHistorialSalida());
  }, [dispatch]);

  const handleSearch = (searchTerms, searchValue) => {
    setSearchTerms(searchTerms);
  };

  return (
    <div className={styles.container}>
      <Title>Compras</Title>
      <div className={styles.chartContainer}>
      <SearchBar onSearch={handleSearch} />
        <InformeConsumo chartData={chartData} loading={loading} error={error} />
      </div>
      <RemitosSalidaList remitos={filteredData} />
    </div>
  );
}; 