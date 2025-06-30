import React from 'react';
import styles from './SearchPosition.module.css';

export const SearchPosition = ({ onSearch }) => {
  const [filters, setFilters] = React.useState({
    rack: '',
    fila: '',
    nivel: '',
    pasillo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  // Generar opciones para los selectores
  const rackOptions = Array.from({ length: 20 }, (_, i) => i + 1);
  const filaOptions = Array.from({ length: 14 }, (_, i) => i + 1);
  const nivelOptions = ['A', 'B'];
  const pasilloOptions = Array.from({ length: 11 }, (_, i) => i + 1);

  return (
    <div className={styles.container}>
      <div className={styles.selectGroup}>
        <label htmlFor="rack">Rack</label>
        <select
          id="rack"
          name="rack"
          value={filters.rack}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">Todos</option>
          {rackOptions.map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      <div className={styles.selectGroup}>
        <label htmlFor="fila">Fila</label>
        <select
          id="fila"
          name="fila"
          value={filters.fila}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">Todas</option>
          {filaOptions.map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      <div className={styles.selectGroup}>
        <label htmlFor="nivel">Nivel</label>
        <select
          id="nivel"
          name="nivel"
          value={filters.nivel}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">Todos</option>
          {nivelOptions.map(nivel => (
            <option key={nivel} value={nivel}>{nivel}</option>
          ))}
        </select>
      </div>

      <div className={styles.selectGroup}>
        <label htmlFor="pasillo">Pasillo</label>
        <select
          id="pasillo"
          name="pasillo"
          value={filters.pasillo}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">Todos</option>
          {pasilloOptions.map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
    </div>
  );
}; 