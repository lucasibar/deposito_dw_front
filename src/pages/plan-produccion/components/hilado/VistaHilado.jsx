import React from 'react';
import { Box } from '@mui/material';
import { HiladoNecesario } from './HiladoNecesario';
import { HiladoAsignado } from './HiladoAsignado';

export const VistaHilado = () => {
  return (
    <Box sx={{ 
      flex: 1, 
      display: 'flex', 
      gap: 2,
      width: '100%'
    }}>
      {/* Left Side */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column'
      }}>
        <HiladoNecesario />
      </Box>

      {/* Right Side */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column'
      }}>
        <HiladoAsignado />
      </Box>
    </Box>
  );
}; 