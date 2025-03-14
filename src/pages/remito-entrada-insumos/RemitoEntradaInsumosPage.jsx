import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import styles from './RemitoEntradaInsumosPage.module.css';
import { Title } from '../../shared/ui/Title/Title';
import { FormRemito } from '../../widgets/remito-entrada-insumos/FormRemito/FormRemito';
import { ListaPartidasRemito } from '../../widgets/remito-entrada-insumos/ListaPartidasRemito/ListaPartidasRemito';
import { useSelector, useDispatch } from 'react-redux';
import { subirRemitoEntrada } from '../../features/remitos/model/slice';
import Swal from 'sweetalert2';

export const RemitoEntradaInsumosPage = () => {
  const dispatch = useDispatch();
  const partidas = useSelector(state => state.remitos?.partidasRemitoEntrada || []);
  const formData = useSelector(state => state.remitos?.formData || {});

  const handleSubirRemito = () => {
    if (!formData.proveedor || !formData.numeroRemito || !formData.fecha) {
      Swal.fire({
        title: "Error",
        text: "Completa todos los campos obligatorios.",
        icon: "error"
      });
      return;
    }

    if (partidas.length === 0) {
      Swal.fire({
        title: "Error",
        text: "Debe agregar al menos una partida al remito.",
        icon: "error"
      });
      return;
    }

    dispatch(subirRemitoEntrada({formData, partidas}));
  };

  return (
    <div className={styles.container}>
      <Title>Remito Entrada Insumos</Title>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '20px',
          height: 'calc(100vh - 150px)',
          marginTop: '-30px',
          maxWidth: '800px',
          margin: '-30px auto 0',
          overflow: 'hidden'
        }}
      >
        {/* Título de datos del remito */}
        <Typography variant="h6">
          Datos del Remito
        </Typography>

        {/* Formulario de datos del remito */}
        <FormRemito />

        {/* Título de la lista de partidas */}
        <Typography variant="h6">
          Lista de Partidas
        </Typography>

        {/* Lista de partidas con scroll */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <ListaPartidasRemito />
        </Box>

        {/* Botón Subir Remito */}
        <Button
          variant="outlined"
          fullWidth
          onClick={handleSubirRemito}
          disabled={partidas.length === 0}
          sx={{ 
            mt: 2,
            color: '#2ecc71',
            borderColor: '#2ecc71',
            '&:hover': {
              borderColor: '#27ae60',
              color: '#27ae60',
              bgcolor: 'transparent'
            }
          }}
        >
          Subir Remito que onda
        </Button>
      </Box>
    </div>
  );
}; 