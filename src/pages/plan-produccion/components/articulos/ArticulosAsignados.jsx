import React from 'react';
import { Paper, Typography } from '@mui/material';

export const ArticulosAsignados = () => {
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
        Artículos Asignados en esta Semana
      </Typography>
      {/* Aquí irá el contenido de artículos asignados */}
    </Paper>
  );
}; 