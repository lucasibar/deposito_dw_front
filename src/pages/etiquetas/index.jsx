import React from 'react';
import { Container, Box } from '@mui/material';
import { Title } from '../../shared/ui/Title/Title';
import { BusquedaLote } from '../../widgets/BusquedaLote';

const EtiquetasPage = () => {
  return (
    <>
      <Title>Etiquetas Tejeduría</Title>
      <Container maxWidth="lg">
        <Box py={4}>
          <BusquedaLote />
        </Box>
      </Container>
    </>
  );
};

export default EtiquetasPage; 