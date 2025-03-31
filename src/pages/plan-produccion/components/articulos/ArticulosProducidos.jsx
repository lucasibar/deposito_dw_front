import React from 'react';
import { Paper, Typography } from '@mui/material';

export const ArticulosProducidos = () => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography variant="body1" gutterBottom>
        Artículos Producidos
      </Typography>
      {/* Aquí irá el contenido de artículos producidos */}
    </Paper>
  );
}; 