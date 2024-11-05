import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { adicionRapida } from '../../../redux/actions';
import ItemsSearchBar from './ItemsSearchBar/ItemsSearchBar';

export default function AdicionRapida({ open, onClose, idPosicion }) {
  const dispatch = useDispatch();
  const proveedores = useSelector((state) => state.proveedores);

  const [proveedor, setProveedor] = useState('');
  const [item, setItem] = useState('');
  const [kilos, setKilos] = useState('');
  const [unidades, setUnidades] = useState('');
  const [partida, setPartida] = useState('');

  const handleSubmit = () => {
    dispatch(adicionRapida({ 
      proveedor,
      tipoMovimiento: "ajusteSUMA",
      item,
      kilos,
      unidades,
      partida,
      posicion: idPosicion
     }));
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
            <MenuItem key={prov.id} value={prov}>{prov.nombre}</MenuItem>
          ))}
        </TextField>

        <ItemsSearchBar proveedor={proveedor} setItem={setItem}/>

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
