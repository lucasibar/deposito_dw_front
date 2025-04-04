import React from 'react';
import { Paper, Typography } from '@mui/material';

export const HiladoNecesario = () => {
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
        Hilado Necesario
      </Typography>
      {/* Aquí irá el contenido de hilado necesario */}
    </Paper>
  );
}; 