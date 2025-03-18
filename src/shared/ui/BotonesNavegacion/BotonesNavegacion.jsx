import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';
import { ROUTES } from './constants';

export const BotonesNavegacion = ({ pagina }) => {
  const navigate = useNavigate();

  // Función para determinar estilos del botón
  const getButtonStyles = (isActive) => ({
    width: 12,
    height: 12,
    backgroundColor: isActive ? 'blue' : 'lightgray',
    border: isActive ? '2px solid blue' : 'none',
    borderRadius: '50%',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    '&:hover': {
      backgroundColor: isActive ? 'blue' : 'gray',
    },
    pointerEvents: isActive ? 'none' : 'auto',
  });

  // Determinar navegación y estilos según la página
  const getButtonProps = () => {
    switch (pagina) {
      case 'remito':
        return {
          left: { to: ROUTES.REMITO, active: true },
          middle: { to: ROUTES.CUARENTENA, active: false },
          right: { to: ROUTES.DEPOSITO_HILADO, active: false },
        };
      case 'cuarentena':
        return {
          left: { to: ROUTES.REMITO, active: false },
          middle: { to: ROUTES.CUARENTENA, active: true },
          right: { to: ROUTES.DEPOSITO_HILADO, active: false },
        };
      case 'depositohilado':
        return {
          left: { to: ROUTES.REMITO, active: false },
          middle: { to: ROUTES.CUARENTENA, active: false },
          right: { to: ROUTES.DEPOSITO_HILADO, active: true },
        };
      default:
        return {
          left: { to: ROUTES.REMITO, active: false },
          middle: { to: ROUTES.CUARENTENA, active: false },
          right: { to: ROUTES.DEPOSITO_HILADO, active: false },
        };
    }
  };

  const buttonProps = getButtonProps();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={1}
      sx={{ marginY: 2 }}
    >
      <IconButton
        onClick={() => navigate(buttonProps.left.to)}
        sx={getButtonStyles(buttonProps.left.active)}
      />
      <IconButton
        onClick={() => navigate(buttonProps.middle.to)}
        sx={getButtonStyles(buttonProps.middle.active)}
      />
      <IconButton
        onClick={() => navigate(buttonProps.right.to)}
        sx={getButtonStyles(buttonProps.right.active)}
      />
    </Box>
  );
}; 