import React from 'react';
import { useMediaQuery, Box, Divider } from '@mui/material';
import { FormRemito } from '../../../../features/remito/ui/FormRemito';
import { ListaPartidasRemito } from '../../../../features/remito/ui/ListaPartidasRemito';
import { BarraRemito } from '../../../../features/remito/ui/BarraRemito';
import { BotonesNavegacion } from '../../../../shared/ui/BotonesNavegacion';

export const RemitoWidget = () => {
  const isDesktop = useMediaQuery('(min-width:1024px)');

  return (
    <div>
      <BarraRemito titulo="Remito Recepción" />
      <BotonesNavegacion pagina="remito" />

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
          <FormRemito />
        </Box>

        {/* Divider para monitores */}
        {isDesktop && (
          <Divider orientation="vertical" flexItem sx={{ marginX: '20px' }} />
        )}

        {/* Columna derecha: Lista de partidas */}
        <Box
          sx={{
            flex: isDesktop ? 1 : 'unset',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: isDesktop ? '50%' : '100%',
            gap: '20px',
          }}
        >
          <ListaPartidasRemito />
        </Box>
      </Box>
    </div>
  );
}; 