import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

export default function KilosUnidadesFields  ({ item, kilos, handleKilosChange, unidades, handleUnidadesChange }) {
  return (
<>
    <TextField
      fullWidth
      margin="normal"
      label={`Kilos (max ${item.kilos})`}
      type="number"
      value={kilos}
      onChange={handleKilosChange}
      variant="outlined"
    />
    <TextField
      fullWidth
      margin="normal"
      label={`Unidades (max ${item.unidades})`}
      type="number"
      value={unidades}
      onChange={handleUnidadesChange}
      variant="outlined"
    />
  </>
    );
}
