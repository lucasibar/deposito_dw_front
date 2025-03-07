import React from 'react';
import { Divider, Box, useMediaQuery } from '@mui/material';
import styles from './RemitoEntradaInsumosPage.module.css';
import { Title } from '../../shared/ui/Title/Title';
import { FormRemito } from '../../widgets/remito-entrada-insumos/FormRemito/FormRemito';
import { ListaPartidasRemito } from '../../widgets/remito-entrada-insumos/ListaPartidasRemito/ListaPartidasRemito';

export const RemitoEntradaInsumosPage = () => {
  // Media query para verificar el ancho de la pantalla
  const isDesktop = useMediaQuery('(min-width:1024px)');

  return (
    <div className={styles.container}>
      <Title>Remito Entrada Insumos</Title>

      <Box
        sx={{
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',
          justifyContent: 'space-between',
          alignItems: isDesktop ? 'start' : 'center',
          padding: '20px',
          height: '100%',
          marginTop: '64px'
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