import * as React from 'react';
import { useState } from 'react';
import { TextField } from '@mui/material';


export default function FechaNumeroRemito() {
  const [numeroRemito, setNumeroRemito] = useState("");
  const [fecha, setFecha] = useState("");
  
  const handleNumeroRemitoChange = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    const formattedInput = input.slice(0, 4) + (input.length >= 4 ? '-' : '') + input.slice(4, 12);
    setNumeroRemito(formattedInput);
  };
  
    return (
      <>
        <TextField
        className="form-control"
        id="numero-remito"
        label="Número de remito"
        value={numeroRemito}
        onChange={handleNumeroRemitoChange}
        />

        <TextField
        className="form-control"
        id="fecha"
        label="Fecha"
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        InputLabelProps={{ shrink: true }}
        />
    </>
  );
}