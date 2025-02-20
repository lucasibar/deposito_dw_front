import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';

export default function BotonesNavegacion({ pagina }) {
  const navigate = useNavigate();

  // Función para determinar estilos del botón
  const getButtonStyles = (isActive) => ({
    width: 12,
    height: 12,
    backgroundColor: isActive ? 'blue' : 'lightgray',
    border: isActive ? '2px solid blue' : 'none',
    borderRadius: '50%',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // Sombra sutil
    '&:hover': {
      backgroundColor: isActive ? 'blue' : 'gray',
    },
    pointerEvents: isActive ? 'none' : 'auto', // Desactivar interacción en el botón activo
  });

  // Determinar navegación y estilos según la página
  const getButtonProps = () => {
    switch (pagina) {
      case 'remito':
        return {
          left: { to: '/deposito_dw_front/remito', active: true },
          middle: { to: '/deposito_dw_front/cuarentena', active: false },
          right: { to: '/deposito_dw_front/deposito-hilado', active: false },
        };
      case 'cuarentena':
        return {
          left: { to: '/deposito_dw_front/remito', active: false },
          middle: { to: '/deposito_dw_front/cuarentena', active: true },
          right: { to: '/deposito_dw_front/deposito-hilado', active: false },
        };
      case 'depositohilado':
        return {
          left: { to: '/deposito_dw_front/remito', active: false },
          middle: { to: '/deposito_dw_front/cuarentena', active: false },
          right: { to: '/deposito_dw_front/deposito-hilado', active: true },
        };
      default:
        return {
          left: { to: '/deposito_dw_front/remito', active: false },
          middle: { to: '/deposito_dw_front/cuarentena', active: false },
          right: { to: '/deposito_dw_front/deposito-hilado', active: false },
        };
    }
  };

  const buttonProps = getButtonProps();

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
        onClick={() => navigate(buttonProps.left.to)}
        sx={getButtonStyles(buttonProps.left.active)}
      />

      {/* Botón del centro */}
      <IconButton
        onClick={() => navigate(buttonProps.middle.to)}
        sx={getButtonStyles(buttonProps.middle.active)}
      />

      {/* Botón de la derecha */}
      <IconButton
        onClick={() => navigate(buttonProps.right.to)}
        sx={getButtonStyles(buttonProps.right.active)}
      />
    </Box>
  );
}
