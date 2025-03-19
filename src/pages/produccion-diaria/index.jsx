import React from 'react';
import { Container, Box } from '@mui/material';
import { Title } from '../../shared/ui/Title/Title';
import { ProduccionForm } from '../../widgets/ProduccionForm';

const ProduccionDiariaPage = () => {
  return (
    <>
      <Title>Producción Diaria</Title>
      <Container maxWidth="lg">
        <Box py={4}>
          <ProduccionForm />
        </Box>
      </Container>
    </>
  );
};

export default ProduccionDiariaPage; 