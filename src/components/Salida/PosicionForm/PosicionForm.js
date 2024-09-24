import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function PosicionForm() {
  const [rack, setRack] = useState("");
  const [fila, setFila] = useState("");
  const [piso, setPiso] = useState("");
  const [pasillo, setPasillo] = useState("");

  // Función para manejar el cambio del rack
  const handleChangeRack = (event) => {
    setRack(event.target.value);
    setPasillo(""); // Si elige rack, fila o piso, deseleccionar pasillo
  };

  // Función para manejar el cambio de fila
  const handleChangeFila = (event) => {
    setFila(event.target.value);
    setPasillo(""); // Si elige rack, fila o piso, deseleccionar pasillo
  };

  // Función para manejar el cambio de piso
  const handleChangePiso = (event) => {
    setPiso(event.target.value);
    setPasillo(""); // Si elige rack, fila o piso, deseleccionar pasillo
  };

  // Función para manejar el cambio de pasillo
  const handleChangePasillo = (event) => {
    setPasillo(event.target.value);
    setRack(""); // Si elige pasillo, deseleccionar rack, fila y piso
    setFila("");
    setPiso("");
  };

  return (
    <div>
      {/* Select para elegir el Rack (1-20) */}
      <FormControl className="form-control" disabled={pasillo !== ""}>
        <InputLabel id="rack-label">Rack</InputLabel>
        <Select
          labelId="rack-label"
          id="rack"
          value={rack}
          onChange={handleChangeRack}
        >
          <MenuItem value="">Ninguno</MenuItem> {/* Opción para deshacer selección */}
          {[...Array(20)].map((_, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              {index + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Select para elegir la Fila (1-14) */}
      <FormControl className="form-control" disabled={pasillo !== ""}>
        <InputLabel id="fila-label">Fila</InputLabel>
        <Select
          labelId="fila-label"
          id="fila"
          value={fila}
          onChange={handleChangeFila}
        >
          <MenuItem value="">Ninguno</MenuItem> {/* Opción para deshacer selección */}
          {[...Array(14)].map((_, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              {index + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Select para elegir el Piso (A o B) */}
      <FormControl className="form-control" disabled={pasillo !== ""}>
        <InputLabel id="piso-label">Piso</InputLabel>
        <Select
          labelId="piso-label"
          id="piso"
          value={piso}
          onChange={handleChangePiso}
        >
          <MenuItem value="">Ninguno</MenuItem> {/* Opción para deshacer selección */}
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
        </Select>
      </FormControl>

      {/* Select para elegir el Pasillo (1-21) */}
      <FormControl className="form-control" disabled={rack !== "" || fila !== "" || piso !== ""}>
        <InputLabel id="pasillo-label">Pasillo</InputLabel>
        <Select
          labelId="pasillo-label"
          id="pasillo"
          value={pasillo}
          onChange={handleChangePasillo}
        >
          <MenuItem value="">Ninguno</MenuItem> {/* Opción para deshacer selección */}
          {[...Array(21)].map((_, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              {index + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}