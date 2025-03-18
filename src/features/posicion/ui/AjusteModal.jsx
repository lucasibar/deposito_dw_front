import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  Modal, 
  Box, 
  Typography, 
  TextField, 
  IconButton 
} from '@mui/material';
import { actualizarKilosUnidades } from '../model/slice';

export const AjusteModal = ({ open, onClose, item }) => {
  const dispatch = useDispatch();
  const [kilos, setKilos] = useState(item.kilos);
  const [unidades, setUnidades] = useState(item.unidades);

  const handleAjusteSubmit = () => {
    dispatch(actualizarKilosUnidades({
      itemId: item.id,
      kilos: parseFloat(kilos),
      unidades: parseInt(unidades)
    }));
    onClose();
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
        <Typography variant="h6">Ajuste de mercadería</Typography>
        <TextField
          label="Kilos"
          value={kilos}
          onChange={(e) => setKilos(e.target.value)}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Unidades"
          value={unidades}
          onChange={(e) => setUnidades(e.target.value)}
          fullWidth
          margin="normal"
          type="number"
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <IconButton onClick={handleAjusteSubmit} color="primary">
            Aceptar
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
}; 