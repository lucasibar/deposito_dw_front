import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Title } from '../../shared/ui/Title/Title';
import { fetchPartidasEnCuarentena } from '../../features/partidas/model/slice';
import styles from './CalidadPage.module.css';
import { SearchBar } from '../../shared/ui/SearchBar/SearchBar';
import { CalidadTabs } from '../../widgets/calidad/CalidadTabs/CalidadTabs';
//import { PartidaList } from '../../widgets/partidas/PartidaList/PartidaList';

export const CalidadPage = () => {
  const dispatch = useDispatch();
  const [searchTerms, setSearchTerms] = useState([]);
  
  useEffect(() => {
    dispatch(fetchPartidasEnCuarentena());
  }, [dispatch]);

  const handleSearch = (searchTerms, searchValue) => {
    setSearchTerms(searchTerms);
  };

  return (
    <div className={styles.container}>
      <Title>Calidad</Title>
      <SearchBar onSearch={handleSearch} />
      <CalidadTabs searchTerms={searchTerms} />
      {/* <PartidaList searchTerms={searchTerms} /> */}
    </div>
  );
};
