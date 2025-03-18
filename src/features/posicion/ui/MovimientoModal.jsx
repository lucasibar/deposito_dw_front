import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  Modal, 
  Box, 
  Typography, 
  TextField, 
  MenuItem, 
  IconButton 
} from '@mui/material';
import { enviarMovimiento } from '../model/slice';

export const MovimientoModal = ({ open, onClose, item, posicionId }) => {
  const dispatch = useDispatch();
  const [rack, setRack] = useState('');
  const [fila, setFila] = useState('');
  const [nivel, setNivel] = useState('');
  const [pasillo, setPasillo] = useState('');
  const [kilos, setKilos] = useState(item.kilos);
  const [unidades, setUnidades] = useState(item.unidades);

  const isLocationSelected = () => {
    return (rack && fila && nivel) || pasillo;
  };

  const handleMovimientoSubmit = () => {
    const data = pasillo ? { pasillo } : { rack, fila, nivel };
    dispatch(enviarMovimiento({ 
      item: { ...item, kilos, unidades }, 
      data, 
      posicionId 
    }));
    onClose();
  };

  const handleCantidadMovimiento = (e) => {
    const value = parseInt(e.target.value);
    const newKilos = Math.round((item.kilos / item.unidades) * value);
    const maxKilos = Math.min(newKilos, item.kilos);
    const maxUnidades = Math.min(value, item.unidades);
    setKilos(maxKilos);
    setUnidades(maxUnidades);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ 
        padding: 4, 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        maxWidth: 400, 
        margin: 'auto', 
        marginTop: '10%' 
      }}>
        <Typography variant="h6">Movimiento interno</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <TextField
            label="Fila"
            value={rack}
            onChange={(e) => setRack(e.target.value)}
            disabled={pasillo !== ''}
            select
            margin="normal"
            sx={{ width: '100px', marginRight: '10px' }}
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
            margin="normal"
            sx={{ width: '100px', marginRight: '10px' }}
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
            margin="normal"
            sx={{ width: '100px', marginRight: '10px' }}
          >
            {['A', 'B'].map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>

          <TextField
            label="Pasillo"
            value={pasillo}
            onChange={(e) => {
              setPasillo(e.target.value);
              setRack('');
              setFila('');
              setNivel('');
            }}
            select
            margin="normal"
            sx={{ width: '100px' }}
          >
            {[...Array(12).keys()].map((i) => (
              <MenuItem key={i} value={i}>{i}</MenuItem>
            ))}
          </TextField>
        </Box>

        <Typography variant="h6" component="h6">
          Kilos {kilos}
        </Typography>
        <TextField
          label="Unidades"
          type="number"
          value={unidades}
          onChange={handleCantidadMovimiento}
          fullWidth
          margin="normal"
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <IconButton
            onClick={handleMovimientoSubmit}
            color="primary"
            disabled={!isLocationSelected()}
          >
            Aceptar
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
}; 