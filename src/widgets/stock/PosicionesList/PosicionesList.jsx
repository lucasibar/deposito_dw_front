import React from 'react';
import { FaFlask, FaCheckCircle } from 'react-icons/fa';
import styles from './PosicionesList.module.css';

export const PosicionesList = ({ posiciones, loading, error }) => {
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!posiciones.length) return <div>No hay posiciones disponibles</div>;

  return (
    <div className={styles.listContainer}>
      {posiciones.map((posicion) => (
        posicion.items.map((item, index) => (
          <div key={`${posicion.id}-${item.id}-${index}`} className={styles.itemCard}>
            <div className={styles.mainContent}>
              <div className={styles.titleRow}>
                <span className={styles.description}>
                  {`${item.descripcion} ${item.categoria || ''}`}
                </span>
              </div>
              
              <div className={styles.providerRow}>
                <span className={styles.provider}>{item.proveedor?.nombre}</span>
                <span className={styles.partida}>Partida: {posicion.numeroPartida}</span>
              </div>
              
              <div className={styles.metricsRow}>
                <span>{item.kilos?.toLocaleString('es-AR')} kilos</span>
                <span>{item.unidades?.toLocaleString('es-AR')} unidades</span>
              </div>
            </div>

            <div className={styles.sideContent}>
              <span className={styles.date}>{posicion.fecha}</span>
              {posicion.estado === 'CUARENTENA' ? (
                <FaFlask className={styles.testIcon} title="En cuarentena" />
              ) : posicion.estado === 'CUARENTENA_REVISION' ? (
                <FaCheckCircle className={styles.approveIcon} title="Pendiente de aprobación" />
              ) : null}
            </div>
          </div>
        ))
      ))}
    </div>
  );
}; 