import React from 'react';
import { useDispatch } from 'react-redux';
import { IconButton, Tooltip } from '@mui/material';
import { Search } from '@mui/icons-material';
import { fetchItemsPosicion } from '../../../features/posicion/model/slice';
import styles from './SearchPosition.module.css';

export const SearchPosition = ({ onSearch, onItemsLoaded }) => {
  const dispatch = useDispatch();
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

  const handleSearchPosition = async () => {
    // Verificar que todos los campos estén completos
    if (!filters.rack || !filters.fila || !filters.nivel || !filters.pasillo) {
      alert('Por favor complete todos los campos para buscar una posición específica');
      return;
    }

    try {
      // Construir el ID de la posición basado en los filtros
      const posicionId = `${filters.rack}-${filters.fila}-${filters.nivel}-${filters.pasillo}`;
      
      // Llamar a la API para obtener los items de esa posición específica
      await dispatch(fetchItemsPosicion(posicionId));
      
      // Notificar al componente padre que se cargaron los items
      if (onItemsLoaded) {
        onItemsLoaded();
      }
    } catch (error) {
      console.error('Error al buscar posición específica:', error);
    }
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

      <div className={styles.searchButton}>
        <Tooltip title="Buscar materiales de esta posición">
          <IconButton onClick={handleSearchPosition} className={styles.searchIcon}>
            <Search />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}; 