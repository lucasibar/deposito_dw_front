import React from 'react';
import styles from './ErrorMessage.module.css';

export const ErrorMessage = ({ message }) => {
  return (
    <div className={styles.error}>
      <p>Error: {message}</p>
    </div>
  );
}; 