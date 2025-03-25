import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
} from '@mui/material';
import {
  fetchClientes,
  setDialogArticulo,
} from '../model/slice';
import DialogAgregarArticulo from './components/DialogAgregarArticulo';
import DialogNuevoCliente from './components/DialogNuevoCliente';
import FormularioBasico from './components/FormularioBasico';
import SnackbarFeedback from './components/SnackbarFeedback';

const FormOrdenPedido = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClientes());
  }, [dispatch]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormularioBasico />
      
      <Button
        variant="outlined"
        fullWidth
        onClick={() => dispatch(setDialogArticulo(true))}
        sx={{ mt: 2 }}
      >
        Agregar Artículo
      </Button>

      <DialogNuevoCliente />
      <DialogAgregarArticulo />
      <SnackbarFeedback />
    </Box>
  );
};

export default FormOrdenPedido; 