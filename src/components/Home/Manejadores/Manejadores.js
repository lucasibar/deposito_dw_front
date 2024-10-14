import * as React from 'react';
import { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import { Box } from '@mui/system';

export default function Manejadores() {
  const [proveedor, setProveedor] = useState('');
  const [item, setItem] = useState('');
  const [rack, setRack] = useState('');
  const [fila, setFila] = useState('');
  const [deposito, setDeposito] = useState('');

  // Funciones para manejar los cambios en cada seleccionador
  const handleProveedorChange = (event) => setProveedor(event.target.value);
  const handleItemChange = (event) => setItem(event.target.value);
  const handleRackChange = (event) => setRack(event.target.value);
  const handleFilaChange = (event) => setFila(event.target.value);
  const handleDepositoChange = (event) => setDeposito(event.target.value);

  return (
    <Box sx={{ padding: 2 }}>
      {/* Primera línea: Selectores de Proveedor e Item */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Proveedor</InputLabel>
            <Select value={proveedor} onChange={handleProveedorChange}>
              <MenuItem value=""><em>Todos</em></MenuItem>
              <MenuItem value="Proveedor 1">Proveedor 1</MenuItem>
              <MenuItem value="Proveedor 2">Proveedor 2</MenuItem>
              <MenuItem value="Proveedor 3">Proveedor 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <FormControl fullWidth>
            <InputLabel>Item</InputLabel>
            <Select value={item} onChange={handleItemChange}>
              <MenuItem value=""><em>Todos</em></MenuItem>
              <MenuItem value="Item 1">Item 1</MenuItem>
              <MenuItem value="Item 2">Item 2</MenuItem>
              <MenuItem value="Item 3">Item 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Segunda línea: Selectores de Rack, Fila y Depósito */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Rack</InputLabel>
            <Select value={rack} onChange={handleRackChange}>
              <MenuItem value=""><em>Todos</em></MenuItem>
              <MenuItem value="Rack 1">Rack 1</MenuItem>
              <MenuItem value="Rack 2">Rack 2</MenuItem>
              <MenuItem value="Rack 3">Rack 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Fila</InputLabel>
            <Select value={fila} onChange={handleFilaChange}>
              <MenuItem value=""><em>Todos</em></MenuItem>
              <MenuItem value="Fila 1">Fila 1</MenuItem>
              <MenuItem value="Fila 2">Fila 2</MenuItem>
              <MenuItem value="Fila 3">Fila 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Depósito</InputLabel>
            <Select value={deposito} onChange={handleDepositoChange}>
              <MenuItem value=""><em>Todos</em></MenuItem>
              <MenuItem value="Depósito 1">Depósito 1</MenuItem>
              <MenuItem value="Depósito 2">Depósito 2</MenuItem>
              <MenuItem value="Depósito 3">Depósito 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}