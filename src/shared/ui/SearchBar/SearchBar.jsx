import React from 'react';
import styles from './SearchBar.module.css';

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
      <input
        type="text"
        placeholder={placeholder || 'Buscar...'}
        onChange={handleSearch}
        className={styles.searchInput}
      />
    </div>
  );
}; 