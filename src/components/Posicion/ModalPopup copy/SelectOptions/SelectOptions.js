import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function SelectOptions ({ opcionSeleccionada, handleOpcionChange }) {
  return (
         <FormControl fullWidth margin="normal">
        <InputLabel id="opcion-label">Selecciona una opción</InputLabel>
        <Select
          labelId="opcion-label"
          value={opcionSeleccionada}
          onChange={handleOpcionChange}
        >
          <MenuItem value=""><em>Ninguna</em></MenuItem>
          <MenuItem value="Agregar al remito de Salida">Agregar al remito de Salida</MenuItem>
          <MenuItem value="Ajuste RESTA mercaderia">Ajuste RESTA mercaderia</MenuItem>
          <MenuItem value="Ajuste SUMA mercaderia">Ajuste SUMA mercaderia</MenuItem>
          <MenuItem value="Movimiento Interno">Movimiento Interno</MenuItem>
        </Select>
      </FormControl>
    );
}
