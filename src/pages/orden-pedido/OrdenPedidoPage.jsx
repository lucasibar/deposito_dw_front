import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import styles from './OrdenPedidoPage.module.css';
import { Title } from '../../shared/ui/Title/Title';
import FormOrdenPedido from '../../features/orden-pedido/ui/FormOrdenPedido';
import ListaArticulosOrdenPedido from '../../features/orden-pedido/ui/ListaArticulosOrdenPedido';
import { useSelector, useDispatch } from 'react-redux';
import { subirOrdenPedido } from '../../features/orden-pedido/model/slice';
import Swal from 'sweetalert2';

export const OrdenPedidoPage = () => {
  const dispatch = useDispatch();
  const { orden } = useSelector(state => state.ordenPedido);
  const articulos = useSelector(state => state.ordenPedido?.articulosPedido || []);

  const handleSubirOrdenPedido = () => {
    if (!orden.numeroPO || !orden.fecha || !orden.clienteId) {
      Swal.fire({
        title: "Error",
        text: "Completa todos los campos obligatorios.",
        icon: "error"
      });
      return;
    }

    if (articulos.length === 0) {
      Swal.fire({
        title: "Error",
        text: "Debe agregar al menos un artículo a la orden de pedido.",
        icon: "error"
      });
      return;
    }
    dispatch(subirOrdenPedido({orden, articulos}));
  };

  return (
    <div className={styles.container}>
      <Title>Orden de Pedido</Title>

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
        <FormOrdenPedido />

        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <ListaArticulosOrdenPedido />
        </Box>

        {/* Botón Subir Orden */}
        <Button
          variant="outlined"
          fullWidth
          onClick={handleSubirOrdenPedido}
          disabled={articulos.length === 0}
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
          Subir Orden de Pedido
        </Button>
      </Box>
    </div>
  );
}; 