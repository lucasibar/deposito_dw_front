import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { enviarMovimiento } from '../../../features/movimientos/model/slice';

export default function MovimientoModal({ open, onClose, item, id }) {
  const dispatch = useDispatch();
  const [rack, setRack] = useState('');
  const [fila, setFila] = useState('');
  const [nivel, setNivel] = useState('');
  const [pasillo, setPasillo] = useState('');
  const [kilos, setKilos] = useState(item?.kilos || 0);
  const [unidades, setUnidades] = useState(item?.unidades || 0);

  // Actualizar valores cuando cambie el item
  useEffect(() => {
    if (item) {
      setKilos(item.kilos || 0);
      setUnidades(item.unidades || 0);
    }
  }, [item]);

  const isLocationSelected = () => {
    return ((rack && fila && nivel) || pasillo) && kilos > 0 && unidades > 0;
  };

  const handleMovimientoSubmit = () => {
    const data = pasillo ? { pasillo } : { rack, fila, nivel };
    
    const selectedItemData = {
      itemId: item.itemId,
      categoria: item.categoria,
      descripcion: item.descripcion,
      proveedor: item.proveedor,
      partida: item.partida,
      kilos,
      unidades
    };
    
    dispatch(enviarMovimiento(selectedItemData, data, id, onClose));
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
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm" 
      fullWidth
    >
      <DialogTitle>Movimiento interno</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, flexWrap: 'wrap', mt: 2 }}>
          <TextField
            label="Rack"
            value={rack}
            onChange={(e) => setRack(e.target.value)}
            disabled={pasillo !== ''}
            select
            margin="normal"
            sx={{ 
              width: '100px',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#2ecc71',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#2ecc71',
              }
            }}
          >
            {[...Array(20)].map((_, i) => (
              <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Fila"
            value={fila}
            onChange={(e) => setFila(e.target.value)}
            disabled={pasillo !== ''}
            select
            margin="normal"
            sx={{ 
              width: '100px',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#2ecc71',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#2ecc71',
              }
            }}
          >
            {[...Array(14)].map((_, i) => (
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
            sx={{ 
              width: '100px',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#2ecc71',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#2ecc71',
              }
            }}
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
            sx={{ 
              width: '100px',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#2ecc71',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#2ecc71',
              }
            }}
          >
            {[...Array(12)].map((_, i) => (
              <MenuItem key={i} value={i}>{i}</MenuItem>
            ))}
          </TextField>
        </Box>

        <Typography variant="h6" component="h6" sx={{ mt: 2 }}>
          Kilos {kilos}
        </Typography>
        <TextField
          label="Unidades"
          type="number"
          value={unidades}
          onChange={handleCantidadMovimiento}
          fullWidth
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#2ecc71',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#2ecc71',
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose}
          sx={{
            color: '#2ecc71',
          }}
        >
          Cerrar
        </Button>
        <Button 
          onClick={handleMovimientoSubmit}
          variant="outlined"
          disabled={!isLocationSelected()}
          sx={{
            color: '#2ecc71',
            borderColor: '#2ecc71',
            '&:hover': {
              borderColor: '#27ae60',
              color: '#27ae60',
              bgcolor: 'transparent'
            }
          }}
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
} 