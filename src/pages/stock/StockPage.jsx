import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './StockPage.module.css';
import { SearchBar } from '../../shared/ui/SearchBar/SearchBar';
import { PosicionesList } from '../../widgets/stock/PosicionesList/PosicionesList';
import { fetchPosiciones } from '../../features/posicion/model/slice';
import { usePosicionFilter } from '../../features/posicion/hooks/usePosicionFilter';
import { Title } from '../../shared/ui/Title/Title';
import { ChartCarousel } from '../../widgets/charts/ChartCarousel/ChartCarousel';

export const StockPage = () => {
  const dispatch = useDispatch();
  const [searchTerms, setSearchTerms] = useState([]);
  const { filteredData, loading, error } = usePosicionFilter(searchTerms);

  useEffect(() => {
    dispatch(fetchPosiciones());
  }, [dispatch]);

  const handleSearch = (terms) => {
    setSearchTerms(terms);
  };

  return (
    <div className={styles.container}>
      <Title>Stock</Title>
      <SearchBar onSearch={handleSearch} />
      <div className={styles.mainContent}>
        <div className={styles.listContainer}>
          <PosicionesList posiciones={filteredData} loading={loading} error={error} />
        </div>
        <div className={styles.chartContainer}>
          <ChartCarousel posiciones={filteredData} />
        </div>
      </div>
    </div>
  );
}; 