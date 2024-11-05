import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';

export default function RemitoSalidaModal({ open, onClose, item }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 4, backgroundColor: 'white', borderRadius: '8px', maxWidth: 400, margin: 'auto', marginTop: '10%' }}>
        <Typography variant="h6">Remito de salida</Typography>
        <Typography variant="body2" mt={2}>Procesando el remito para la partida: {item.partida}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <IconButton onClick={onClose} color="primary">Cerrar</IconButton>
        </Box>
      </Box>
    </Modal>
  );
}
