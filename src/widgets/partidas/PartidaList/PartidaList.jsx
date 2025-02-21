import React from 'react';
import { useSelector } from 'react-redux';
import { selectPartidas, selectStatus } from '../../../features/partidas/model/selectors';
import { Loading } from '../../../shared/ui/Loading/Loading';
import styles from './PartidaList.module.css';

export const PartidaList = ({ searchTerms, estado }) => {
  const partidas = useSelector(selectPartidas);
  const status = useSelector(selectStatus);

  if (status === 'loading') {
    return <Loading />;
  }

  // Filtrar por estado
  const partidasFiltradas = partidas.filter(partida => partida.estado === estado);

  // Aplicar búsqueda si hay términos
  const partidasFinal = searchTerms.length > 0
    ? partidasFiltradas.filter(partida => {
        const searchableText = `${partida.numeroPartida} ${partida.descripcionItem} ${partida.proveedor}`.toLowerCase();
        return searchTerms.every(term => searchableText.includes(term));
      })
    : partidasFiltradas;

  if (partidasFinal.length === 0) {
    return (
      <div className={styles.emptyMessage}>
        No hay partidas en este estado
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      {partidasFinal.map((partida) => (
        <div key={partida.id} className={styles.partidaItem}>
          <div className={styles.partidaHeader}>
            <h3>Partida: {partida.numeroPartida}</h3>
            <span className={styles.estado}>{partida.estado}</span>
          </div>
          <p className={styles.descripcion}>{partida.descripcionItem}</p>
          <div className={styles.detalles}>
            <p>Proveedor: {partida.proveedor}</p>
            <p>Kilos: {partida.kilos}</p>
            <p>Unidades: {partida.unidades}</p>
          </div>
          <p className={styles.fecha}>Fecha: {partida.fecha}</p>
        </div>
      ))}
    </div>
  );
}; 