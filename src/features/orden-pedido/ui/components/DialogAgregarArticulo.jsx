import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Button } from '@mui/material';
import { setDialogArticulo, agregarArticulo, setSnackbar } from '../../model/slice';

const DialogAgregarArticulo = () => {
  const dispatch = useDispatch();
  const { openDialogArticulo } = useSelector(state => state.ordenPedido.ui);
  const [articuloSeleccionado, setArticuloSeleccionado] = useState({
    codigoArticulo: '',
    talle: '',
    cantidad: '',
  });

  const handleAgregarArticulo = () => {
    if (!articuloSeleccionado.codigoArticulo || !articuloSeleccionado.talle || !articuloSeleccionado.cantidad) {
      dispatch(setSnackbar({ 
        open: true, 
        message: 'Por favor complete todos los campos del artículo',
        severity: 'error'
      }));
      return;
    }

    dispatch(agregarArticulo(articuloSeleccionado));
    
    setArticuloSeleccionado({
      codigoArticulo: '',
      talle: '',
      cantidad: '',
    });
  };

  return (
    <Dialog open={openDialogArticulo} onClose={() => dispatch(setDialogArticulo(false))}>
      <DialogTitle>Agregar Artículo</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Código de Artículo"
            value={articuloSeleccionado.codigoArticulo}
            onChange={(e) => setArticuloSeleccionado({
              ...articuloSeleccionado,
              codigoArticulo: e.target.value
            })}
            fullWidth
          />
          <TextField
            label="Talle"
            value={articuloSeleccionado.talle}
            onChange={(e) => setArticuloSeleccionado({
              ...articuloSeleccionado,
              talle: e.target.value
            })}
            fullWidth
          />
          <TextField
            label="Cantidad"
            type="number"
            value={articuloSeleccionado.cantidad}
            onChange={(e) => setArticuloSeleccionado({
              ...articuloSeleccionado,
              cantidad: e.target.value
            })}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(setDialogArticulo(false))}>Cancelar</Button>
        <Button onClick={handleAgregarArticulo} variant="contained">Agregar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAgregarArticulo; 