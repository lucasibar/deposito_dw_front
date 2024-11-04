import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

export default function MovimientoInternoForm({ rack, setRack, fila, setFila, ab, setAB }) {


  return (
     <>
    <TextField
      fullWidth
      margin="normal"
      label="Número de Rack"
      type="text"
      value={rack}
      onChange={(e) => setRack(e.target.value)}
      variant="outlined"
    />
    <TextField
      fullWidth
      margin="normal"
      label="Fila"
      type="text"
      value={fila}
      onChange={(e) => setFila(e.target.value)}
      variant="outlined"
    />
    <FormControl fullWidth margin="normal">
      <InputLabel id="ab-label">A/B</InputLabel>
      <Select
        labelId="ab-label"
        value={ab}
        onChange={(e) => setAB(e.target.value)}
      >
        <MenuItem value=""><em>Ninguno</em></MenuItem>
        <MenuItem value="A">A</MenuItem>
        <MenuItem value="B">B</MenuItem>
      </Select>
    </FormControl>
  </>
  );
}
