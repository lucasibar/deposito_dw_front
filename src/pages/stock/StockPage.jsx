import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './StockPage.module.css';
import { SearchBar } from '../../shared/ui/SearchBar/SearchBar';
import { PosicionesList } from '../../widgets/stock/PosicionesList/PosicionesList';
import { fetchPosiciones } from '../../features/stock/model/slice';
import { useStockFilter } from '../../features/stock/hooks/useStockFilter';
import { Title } from '../../shared/ui/Title/Title';
export const StockPage = () => {
  const dispatch = useDispatch();
  const [searchTerms, setSearchTerms] = useState([]);
  const { filteredData, loading, error } = useStockFilter(searchTerms);

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
      <div className={styles.content}>
        <PosicionesList posiciones={filteredData} loading={loading} error={error} />
      </div>
    </div>
  );
}; 