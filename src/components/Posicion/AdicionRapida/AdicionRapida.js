import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { agregarNuevoItem } from '../../../redux/actions';

export default function AdicionRapida({ open, onClose }) {
  const dispatch = useDispatch();
  const proveedores = useSelector((state) => state.proveedores);
  const items = useSelector((state) => state.items);

  const [proveedor, setProveedor] = useState('');
  const [item, setItem] = useState('');
  const [kilos, setKilos] = useState('');
  const [unidades, setUnidades] = useState('');
  const [partida, setPartida] = useState('');

  const handleSubmit = () => {
    dispatch(agregarNuevoItem({ proveedor, item, kilos, unidades, partida }));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box 
        sx={{
          padding: 4,
          backgroundColor: 'white',
          borderRadius: '8px',
          maxWidth: 400,
          margin: 'auto',
          marginTop: '10%',
          maxHeight: '80vh', // Limitar altura del modal
          overflowY: 'auto'  // Activar scroll en contenido largo
        }}
      >
        <Typography variant="h6" mb={2}>Agregar Nuevo Ítem</Typography>
        
        <TextField
          label="Proveedor"
          value={proveedor}
          onChange={(e) => setProveedor(e.target.value)}
          select
          fullWidth
          margin="normal"
        >
          {proveedores.map((prov) => (
            <MenuItem key={prov.id} value={prov.id}>{prov.nombre}</MenuItem>
          ))}
        </TextField>

        <TextField
          label="Ítem"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          select
          fullWidth
          margin="normal"
        >
          {items.map((itm) => (
            <MenuItem key={itm.id} value={itm.id}>{itm.descripcion}</MenuItem>
          ))}
        </TextField>

        <TextField
          label="Kilos"
          type="number"
          value={kilos}
          onChange={(e) => setKilos(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Unidades"
          type="number"
          value={unidades}
          onChange={(e) => setUnidades(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Número de Partida"
          value={partida}
          onChange={(e) => setPartida(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Agregar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
