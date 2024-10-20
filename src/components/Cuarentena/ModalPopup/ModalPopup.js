import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

export default function ModalPopup({ open, handleClose, partida, kilosRestantes, unidadesRestantes, handleGuardarAsignacion }) {
  const [rack, setRack] = useState('');
  const [fila, setFila] = useState('');
  const [ab, setAB] = useState('');
  const [pasillo, setPasillo] = useState('');
  const [kilos, setKilos] = useState('');
  const [unidades, setUnidades] = useState('');

  useEffect(() => {
    setKilos('');
    setUnidades('');
    setRack('');
    setFila('');
    setAB('');
    setPasillo('');
  }, [kilosRestantes, unidadesRestantes]);

  const handleRackChange = (event) => {
    setRack(event.target.value);
    setPasillo(''); // Deshabilitar pasillo cuando se selecciona rack
  };

  const handleFilaChange = (event) => {
    setFila(event.target.value);
    setPasillo(''); // Deshabilitar pasillo cuando se selecciona fila
  };

  const handleABChange = (event) => {
    setAB(event.target.value);
    setPasillo(''); // Deshabilitar pasillo cuando se selecciona A/B
  };

  const handlePasilloChange = (event) => {
    setPasillo(event.target.value);
    setRack('');
    setFila('');
    setAB(''); // Deshabilitar rack, fila y A/B cuando se selecciona pasillo
  };

  const handleKilosChange = (event) => {
    setKilos(event.target.value);
  };

  const handleUnidadesChange = (event) => {
    setUnidades(event.target.value);
  };

  const handleGuardar = () => {
    const kilosAsignados = parseFloat(kilos);
    const unidadesAsignadas = parseInt(unidades, 10);

    if (kilosAsignados <= kilosRestantes && unidadesAsignadas <= unidadesRestantes) {
      const data = {
        partidaId: partida.id,
        rack,
        fila,
        ab,
        pasillo,
        kilos: kilosAsignados,
        unidades: unidadesAsignadas,
      };

      handleGuardarAsignacion(data);
      handleClose(); 
    } else {
      alert('No puedes asignar más kilos o unidades de los disponibles.');
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: '12px',
          boxShadow: 24,
          p: 4,
          minWidth: '300px',
          maxWidth: '500px',
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          {`${partida.item.proveedor.nombre} ${partida.item?.categoria} ${partida.item?.descripcion}`}
        </Typography>

        <Typography variant="body2" gutterBottom>
          {`Kilos restantes: ${kilosRestantes} | Unidades restantes: ${unidadesRestantes}`}
        </Typography>

        {/* Selector de Rack */}
        <FormControl fullWidth margin="normal" disabled={!!pasillo}>
          <InputLabel id="rack-label">Rack</InputLabel>
          <Select
            labelId="rack-label"
            value={rack}
            onChange={handleRackChange}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {Array.from({ length: 20 }, (_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                {`Rack ${index + 1}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Selector de Fila */}
        <FormControl fullWidth margin="normal" disabled={!!pasillo}>
          <InputLabel id="fila-label">Fila</InputLabel>
          <Select
            labelId="fila-label"
            value={fila}
            onChange={handleFilaChange}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {Array.from({ length: 14 }, (_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                {`Fila ${index + 1}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Selector de A/B */}
        <FormControl fullWidth margin="normal" disabled={!!pasillo}>
          <InputLabel id="ab-label">A/B</InputLabel>
          <Select
            labelId="ab-label"
            value={ab}
            onChange={handleABChange}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
          </Select>
        </FormControl>

        {/* Selector de Pasillo */}
        <FormControl fullWidth margin="normal" disabled={!!rack || !!fila || !!ab}>
          <InputLabel id="pasillo-label">Pasillo</InputLabel>
          <Select
            labelId="pasillo-label"
            value={pasillo}
            onChange={handlePasilloChange}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {Array.from({ length: 12 }, (_, index) => (
              <MenuItem key={index} value={index}>
                {`Pasillo ${index}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Input de Kilos */}
        <TextField
          fullWidth
          margin="normal"
          label="Kilos"
          type="number"
          value={kilos}
          onChange={handleKilosChange}
          variant="outlined"
        />

        {/* Input de Unidades */}
        <TextField
          fullWidth
          margin="normal"
          label="Unidades"
          type="number"
          value={unidades}
          onChange={handleUnidadesChange}
          variant="outlined"
        />

        {/* Botones */}
        <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={handleGuardar}>
            MERCADERIA APROBADA
          </Button>    
          <Button
            variant="contained"
            color="error"
            onClick={handleGuardar}
            disabled={!kilos || !unidades || (!rack && !pasillo)} // Deshabilita si no se ingresan kilos, unidades, rack o pasillo
          >       
  DEVOLUCION
</Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}