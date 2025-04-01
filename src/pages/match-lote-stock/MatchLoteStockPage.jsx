import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Title } from '../../shared/ui/Title/Title';
import styles from './MatchLoteStockPage.module.css';

export const MatchLoteStockPage = () => {
  return (
    <div className={styles.pageContainer}>
      <Title>Match Lote/Stock</Title>
      <div className={styles.container}>
        <Box className={styles.boxContainer}>
          <Paper className={styles.box}>
            <Typography variant="h6" className={styles.boxTitle}>
              Lote de Producción
            </Typography>
            {/* Content will go here */}
          </Paper>
          
          <Paper className={styles.box}>
            <Typography variant="h6" className={styles.boxTitle}>
              Hilado Utilizado
            </Typography>
            {/* Content will go here */}
          </Paper>
        </Box>
      </div>
    </div>
  );
}; 