import React, { useState } from 'react';
import styles from './RemitosSalidaList.module.css';

export const RemitosSalidaList = ({ remitos }) => {
  const [expandedRemitos, setExpandedRemitos] = useState({});

  const getKey = (remito) => `${remito.fecha}-${remito.proveedor}`;

  const toggleRemito = (key) => {
    setExpandedRemitos(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className={styles.container}>
      {remitos.map(remito => {
        const key = getKey(remito);
        return (
          <div key={key} className={styles.remito}>
            <div 
              className={styles.remitoHeader}
              onClick={() => toggleRemito(key)}
            >
              <span className={styles.fecha}>
                {new Date(remito.fecha).toLocaleDateString()}
              </span>
              <span className={styles.proveedor}>{remito.proveedor}</span>
              <span className={styles.arrow}>
                {expandedRemitos[key] ? '▼' : '▶'}
              </span>
            </div>
            {expandedRemitos[key] && (
              <div className={styles.items}>
                <table className={styles.itemsTable}>
                  <thead>
                    <tr>
                      <th>Proveedor</th>
                      <th>Descripción</th>
                      <th>Kilos</th>
                      <th>Categoría</th>
                      <th>Partida</th>
                    </tr>
                  </thead>
                  <tbody>
                    {remito.items.map(item => (
                      <tr key={item.id} className={styles.item}>
                        <td>{item.proveedor}</td>
                        <td>{item.descripcion}</td>
                        <td>{item.kilos}</td>
                        <td>{item.categoria}</td>
                        <td>{item.partida}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}; 