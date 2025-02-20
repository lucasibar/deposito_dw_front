import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const ListadoKilosPartidaPorPosicion = ({ 
  distribucionDeKilosEnPosiciones, 
  setDistribucionDeKilosEnPosiciones 
}) => {
  const handleDelete = (index) => {
    setDistribucionDeKilosEnPosiciones(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Box mt={2}>
      {distribucionDeKilosEnPosiciones.map((distribucion, index) => (
        <Box 
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 1,
            borderBottom: '1px solid #eee'
          }}
        >
          <Typography variant="body2">
            {distribucion.pasillo 
              ? `Pasillo ${distribucion.pasillo}`
              : `Rack ${distribucion.rack} Fila ${distribucion.fila} ${distribucion.ab}`
            }
          </Typography>
          <Typography variant="body2">
            {`${distribucion.kilos} kg - ${distribucion.unidades} und`}
          </Typography>
          <IconButton 
            size="small" 
            onClick={() => handleDelete(index)}
            sx={{ color: 'error.main' }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
}; 