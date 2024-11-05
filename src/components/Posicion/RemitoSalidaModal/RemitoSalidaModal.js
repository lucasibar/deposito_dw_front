import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { agregarAlRemitoSalida } from '../../../redux/actions';

export default function RemitoSalidaModal({ open, onClose, item, id}) {
  const dispatch = useDispatch();
  const [kilos, setKilos] = useState(item.kilos);
  const [unidades, setUnidades] = useState(item.unidades);

  const handleAjusteSubmit = () => {
    dispatch(agregarAlRemitoSalida(item, kilos, unidades, id));
    onClose();
  };
  return (

    <Modal open={open} onClose={onClose}>
    <Box sx={{ padding: 4, backgroundColor: 'white', borderRadius: '8px', maxWidth: 400, margin: 'auto', marginTop: '10%' }}>
      <Typography variant="h6">Remito de salida</Typography>
      <TextField
        label="Kilos"
        value={kilos}
        onChange={(e) => setKilos(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Unidades"
        value={unidades}
        onChange={(e) => setUnidades(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <IconButton onClick={onClose} color="primary">Cerrar</IconButton>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <IconButton onClick={handleAjusteSubmit} color="primary">Aceptar</IconButton>
      </Box>
    </Box>
  </Modal>
  );
}
