import React from 'react';
import { useMediaQuery, Box, Divider } from '@mui/material';
import FormOrdenPedido from '../../../../features/orden-pedido/ui/FormOrdenPedido';
import { ListaArticulosOrdenPedido } from '../../../../features/orden-pedido/ui/ListaArticulosOrdenPedido';

export const OrdenPedidoWidget = () => {
  const isDesktop = useMediaQuery('(min-width:1024px)');

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',
          justifyContent: 'space-between',
          alignItems: isDesktop ? 'start' : 'center',
          padding: '20px',
          height: '100%',
        }}
      >
        {/* Columna izquierda: Inputs y botones */}
        <Box
          sx={{
            flex: isDesktop ? 1 : 'unset',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: isDesktop ? '50%' : '100%',
          }}
        >
          <FormOrdenPedido />
        </Box>

        {/* Divider para monitores */}
        {isDesktop && (
          <Divider orientation="vertical" flexItem sx={{ marginX: '20px' }} />
        )}

        {/* Columna derecha: Lista de artículos */}
        <Box
          sx={{
            flex: isDesktop ? 1 : 'unset',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: isDesktop ? '50%' : '100%',
            gap: '20px',
          }}
        >
          <ListaArticulosOrdenPedido />
        </Box>
      </Box>
    </div>
  );
}; 