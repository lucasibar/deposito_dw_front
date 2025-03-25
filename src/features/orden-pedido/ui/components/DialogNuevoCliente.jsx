import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { setDialogCliente } from '../../model/slice';

const DialogNuevoCliente = () => {
  const dispatch = useDispatch();
  const { openDialogCliente } = useSelector(state => state.ordenPedido.ui);
  const [nuevoCliente, setNuevoCliente] = useState({ nombre: '', pais: '' });

  return (
    <Dialog open={openDialogCliente} onClose={() => dispatch(setDialogCliente(false))}>
      <DialogTitle>Nuevo Cliente</DialogTitle>
      <DialogContent>
        {/* ... campos del cliente ... */}
      </DialogContent>
      <DialogActions>
        {/* ... botones ... */}
      </DialogActions>
    </Dialog>
  );
};

export default DialogNuevoCliente; 