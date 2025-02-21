import React from 'react';
import styles from './Loading.module.css';

export const Loading = () => (
  <div className={styles.loadingContainer}>
    <div className={styles.spinner}></div>
  </div>
); 