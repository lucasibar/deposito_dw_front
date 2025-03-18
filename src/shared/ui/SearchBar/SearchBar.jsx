import React from 'react';
import styles from './SearchBar.module.css';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = ({ onSearch, placeholder }) => {
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    const searchTerms = searchValue
      .trim()
      .toLowerCase()
      .split(' ')
      .filter(term => term.length > 0);
    
    onSearch(searchTerms, searchValue);
  };

  return (
    <div className={`${styles.searchContainer}`}>
      <SearchIcon className={styles.searchIcon} />
      <input
        type="text"
        placeholder={placeholder || 'Buscar...'}
        onChange={handleSearch}
        className={styles.searchInput}
      />
    </div>
  );
}; 