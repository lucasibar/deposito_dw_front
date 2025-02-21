import React from 'react';
import styles from './ErrorPopup.module.css';

export const ErrorPopup = ({ message, onClose }) => (
  <div className={styles.overlay}>
    <div className={styles.popup}>
      <h3>Error</h3>
      <p>{message}</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  </div>
); 