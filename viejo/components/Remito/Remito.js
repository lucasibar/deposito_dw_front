import * as React from 'react';
import './Remito.css';
import FormRemito from './FormRemito/FormRemito';
import ListaPartidasRemito from './ListaPartidasRemito/ListaPartidasRemito';
import BarraRemito from './BarraRemito/BarraRemito'; // Importa el nuevo componente
import { Divider, Box, useMediaQuery } from '@mui/material';
import BotonesNavegacion from '../Utils/BotonesNavegacion/BotonesNavegacion';

export default function Remito(props) {
  // Media query para verificar el ancho de la pantalla
  const isDesktop = useMediaQuery('(min-width:1024px)');

  return (
    <div>
      {/* Uso de BarraRemito en lugar de NavBar */}
      <BarraRemito titulo="Remito Recepción" />
      <BotonesNavegacion pagina= 'remito'/>

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
}
