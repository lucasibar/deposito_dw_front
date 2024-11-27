import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';

export default function BotonesNavegacion() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={1} // Espaciado reducido entre botones
      sx={{ marginY: 2 }}
    >
      {/* Botón de la izquierda */}
      <IconButton
        onClick={() => navigate(`/deposito_dw_front/remito`)}
        sx={{
          width: 12,
          height: 12,
          backgroundColor: 'lightgray',
          borderRadius: '50%',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // Sombra sutil
          '&:hover': {
            backgroundColor: 'gray',
          },
        }}
      />

      {/* Botón del centro (actual) */}
      <IconButton
        sx={{
          width: 12,
          height: 12,
          border: '2px solid blue', // Borde azul sin relleno
          borderRadius: '50%',
          backgroundColor: 'transparent',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // Sombra sutil
          pointerEvents: 'none', // No interactivo
        }}
      />

      {/* Botón de la derecha */}
      <IconButton
        onClick={() => navigate(`/deposito_dw_front/cuarentena`)}
        sx={{
          width: 12,
          height: 12,
          backgroundColor: 'lightgray',
          borderRadius: '50%',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // Sombra sutil
          '&:hover': {
            backgroundColor: 'gray',
          },
        }}
      />
    </Box>
  );
}
