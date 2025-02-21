import React from 'react';
import styles from './Title.module.css';

export const Title = ({ children }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{children}</h1>
    </header>
  );
}; 