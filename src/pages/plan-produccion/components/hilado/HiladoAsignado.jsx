import React from 'react';
import { Paper, Typography } from '@mui/material';

export const HiladoAsignado = () => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography variant="body1" gutterBottom>
        Hilado Asignado
      </Typography>
      {/* Aquí irá el contenido de hilado asignado */}
    </Paper>
  );
}; 