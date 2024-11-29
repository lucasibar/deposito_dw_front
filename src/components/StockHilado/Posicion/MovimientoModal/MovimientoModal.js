import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, MenuItem, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { enviarMovimiento } from '../../../../redux/actions';

export default function MovimientoModal({ open, onClose, item, id }) {
  const dispatch = useDispatch();
  const [rack, setRack] = useState('');
  const [fila, setFila] = useState('');
  const [nivel, setNivel] = useState('');
  const [pasillo, setPasillo] = useState('');

  const handleMovimientoSubmit = () => {
    const data = pasillo ? { pasillo } : { rack, fila, nivel };
    dispatch(enviarMovimiento(item, data, id));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 4, backgroundColor: 'white', borderRadius: '8px', maxWidth: 400, margin: 'auto', marginTop: '10%' }}>
        <Typography variant="h6">Movimiento interno</Typography>
        <TextField
          label="Fila"
          value={rack}
          onChange={(e) => setRack(e.target.value)}
          disabled={pasillo !== ''}
          select
          fullWidth
          margin="normal"
        >
          {[...Array(20).keys()].map((i) => (
            <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Rack"
          value={fila}
          onChange={(e) => setFila(e.target.value)}
          disabled={pasillo !== ''}
          select
          fullWidth
          margin="normal"
        >
          {[...Array(14).keys()].map((i) => (
            <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Nivel"
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
          disabled={pasillo !== ''}
          select
          fullWidth
          margin="normal"
        >
          {['A', 'B'].map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Pasillo"
          value={pasillo}
          onChange={(e) => { setPasillo(e.target.value); setRack(''); setFila(''); setNivel(''); }}
          select
          fullWidth
          margin="normal"
        >
          {[...Array(12).keys()].map((i) => (
            <MenuItem key={i} value={i}>{i}</MenuItem>
          ))}
        </TextField>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <IconButton onClick={handleMovimientoSubmit} color="primary">Aceptar</IconButton>
        </Box>
      </Box>
    </Modal>
  );
}
