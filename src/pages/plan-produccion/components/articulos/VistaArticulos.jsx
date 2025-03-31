import React from 'react';
import { Box } from '@mui/material';
import { ArticulosAProducir } from './ArticulosAProducir';
import { ArticulosAsignados } from './ArticulosAsignados';
import { ArticulosProducidos } from './ArticulosProducidos';

export const VistaArticulos = ({ articulos }) => {
  return (
    <Box sx={{ 
      flex: 1, 
      display: 'flex', 
      gap: 2,
      width: '100%'
    }}>
      {/* Left Side - Two sections */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        gap: 2
      }}>
        <ArticulosAProducir articulos={articulos} />
        <ArticulosAsignados />
      </Box>

      {/* Right Side - One section */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column'
      }}>
        <ArticulosProducidos />
      </Box>
    </Box>
  );
}; 