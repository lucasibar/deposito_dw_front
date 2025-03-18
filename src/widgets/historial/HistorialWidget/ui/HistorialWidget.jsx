import React from 'react';
import { Box } from '@mui/material';
import { BarraHistorial } from '../../../../features/historial/ui/BarraHistorial';
import { TablaHistorial } from '../../../../features/historial/ui/TablaHistorial';
import { BotonesNavegacion } from '../../../../shared/ui/BotonesNavegacion';

export const HistorialWidget = () => {
  return (
    <div>
      <BarraHistorial titulo="Historial de Salidas" />
      <BotonesNavegacion pagina="historial" />
      <Box sx={{ padding: 2 }}>
        <TablaHistorial />
      </Box>
    </div>
  );
}; 