import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function AjusteForm() {
  const [proveedor, setProveedor] = useState('');
  const [itemSeleccionado, setItemSeleccionado] = useState('');
  const [numeroPartida, setNumeroPartida] = useState('');
  const [kilos, setKilos] = useState('');
  const [unidades, setUnidades] = useState('');

  return (
    <>
      <FormControl fullWidth margin="normal">
        <InputLabel id="proveedor-label">Proveedor</InputLabel>
        <Select
          labelId="proveedor-label"
          value={proveedor}
          onChange={(e) => setProveedor(e.target.value)}
        >
          <MenuItem value=""><em>Ninguno</em></MenuItem>
          <MenuItem value="Proveedor 1">Proveedor 1</MenuItem>
          <MenuItem value="Proveedor 2">Proveedor 2</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="item-label">Item</InputLabel>
        <Select
          labelId="item-label"
          value={itemSeleccionado}
          onChange={(e) => setItemSeleccionado(e.target.value)}
        >
          <MenuItem value=""><em>Ninguno</em></MenuItem>
          <MenuItem value="Item 1">Item 1</MenuItem>
          <MenuItem value="Item 2">Item 2</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        margin="normal"
        label="Número de Partida"
        type="text"
        value={numeroPartida}
        onChange={(e) => setNumeroPartida(e.target.value)}
        variant="outlined"
      />
      <TextField
        fullWidth
        margin="normal"
        label="Kilos"
        type="number"
        value={kilos}
        onChange={(e) => setKilos(e.target.value)}
        variant="outlined"
      />
      <TextField
        fullWidth
        margin="normal"
        label="Unidades"
        type="number"
        value={unidades}
        onChange={(e) => setUnidades(e.target.value)}
        variant="outlined"
      />
    </>
  );
}
