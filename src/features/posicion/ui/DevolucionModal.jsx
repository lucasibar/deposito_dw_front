import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Modal, 
  Box, 
  Typography, 
  TextField, 
  MenuItem, 
  Button 
} from '@mui/material';
import { adicionRapida } from '../model/slice';
import { ItemsSearchBar } from './ItemsSearchBar';

export const DevolucionModal = ({ open, onClose, posicionId }) => {
  const dispatch = useDispatch();
  const proveedores = useSelector((state) => state.remito.proveedores);

  const [proveedor, setProveedor] = useState('');
  const [item, setItem] = useState('');
  const [kilos, setKilos] = useState('');
  const [unidades, setUnidades] = useState('');
  const [partida, setPartida] = useState('');

  const handleSubmit = () => {
    dispatch(adicionRapida({
      proveedor,
      tipoMovimiento: 'ajusteSUMA',
      item,
      kilos: parseFloat(kilos),
      unidades: parseInt(unidades),
      partida,
      posicion: posicionId,
    }));
    onClose();
  };

  const inputStyle = { fullWidth: true, margin: 'normal' };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        padding: 4,
        backgroundColor: 'white',
        borderRadius: '8px',
        maxWidth: 400,
        margin: 'auto',
        marginTop: '10%',
        maxHeight: '80vh',
        overflowY: 'auto',
      }}>
        <Typography variant="h6" mb={2}>
          Devolución
        </Typography>

        <TextField
          label="Proveedor"
          value={proveedor}
          onChange={(e) => setProveedor(e.target.value)}
          select
          {...inputStyle}
        >
          {proveedores.map((prov) => (
            <MenuItem key={prov.id} value={prov}>
              {prov.nombre}
            </MenuItem>
          ))}
        </TextField>

        <ItemsSearchBar 
          proveedor={proveedor} 
          setItem={setItem} 
          inputStyle={inputStyle} 
        />

        <TextField
          label="Kilos"
          type="number"
          value={kilos}
          onChange={(e) => setKilos(e.target.value)}
          {...inputStyle}
        />

        <TextField
          label="Unidades"
          type="number"
          value={unidades}
          onChange={(e) => setUnidades(e.target.value)}
          {...inputStyle}
        />

        <TextField
          label="Número de Partida"
          value={partida}
          onChange={(e) => setPartida(e.target.value)}
          {...inputStyle}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Agregar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}; 