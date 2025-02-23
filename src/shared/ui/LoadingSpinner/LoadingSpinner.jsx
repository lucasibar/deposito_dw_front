import React from 'react';
import styles from './LoadingSpinner.module.css';

export const LoadingSpinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p>Cargando...</p>
    </div>
  );
}; 