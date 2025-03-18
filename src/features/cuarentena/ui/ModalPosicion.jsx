import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  Modal, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl 
} from '@mui/material';
import Swal from 'sweetalert2';
import { pasarPartidaAStock } from '../model/slice';
import { ListadoKilosPartidaPorPosicion } from './ListadoKilosPartidaPorPosicion';

export const ModalPosicion = ({ open, handleClose, partida }) => {
  const dispatch = useDispatch();
  const [rack, setRack] = useState('');
  const [fila, setFila] = useState('');
  const [ab, setAB] = useState('');
  const [pasillo, setPasillo] = useState('');
  const [kilos, setKilos] = useState('');
  const [unidades, setUnidades] = useState('');
  const [distribucionDeKilosEnPosiciones, setDistribucionDeKilosEnPosiciones] = useState([]);

  const limpiezaEstado = () => {
    setRack('');
    setFila('');
    setAB('');
    setPasillo('');
    setKilos('');
    setUnidades('');
    setDistribucionDeKilosEnPosiciones([]);
    handleClose();
  };

  const handleRackChange = (event) => {
    setRack(event.target.value);
    setPasillo('');
  };

  const handleFilaChange = (event) => {
    setFila(event.target.value);
    setPasillo('');
  };

  const handleABChange = (event) => {
    setAB(event.target.value);
    setPasillo('');
  };

  const handlePasilloChange = (event) => {
    setPasillo(event.target.value);
    setRack('');
    setFila('');
    setAB('');
  };

  const handleKilosChange = (event) => {
    setKilos(event.target.value);
  };

  const handleUnidadesChange = (event) => {
    setUnidades(event.target.value);
  };

  const handleGuardar = () => {
    const nuevaDistribucion = [
      ...distribucionDeKilosEnPosiciones,
      {
        partida,
        rack,
        fila,
        ab,
        pasillo,
        kilos: parseFloat(kilos),
        unidades: parseInt(unidades),
      },
    ];

    const sumaKilos = nuevaDistribucion.reduce((acc, p) => acc + parseFloat(p.kilos), 0);

    if (sumaKilos === parseFloat(partida.kilos)) {
      handleClose();
      Swal.fire({
        title: "Aprobar mercadería",
        text: "La mercadería saldrá de estado cuarentena y se considerará en las posiciones indicadas",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aprobada",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(pasarPartidaAStock(nuevaDistribucion));
        }
        limpiezaEstado();
      });
    } else if (sumaKilos < parseFloat(partida.kilos)) {
      setDistribucionDeKilosEnPosiciones(nuevaDistribucion);
      setRack('');
      setFila('');
      setAB('');
      setPasillo('');
      setKilos('');
      setUnidades('');
      alert("Ingresar el resto de los kilos");
    } else {
      alert("La cantidad de kilos ingresada no es correcta");
    }
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto',
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
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          {`${partida.item.proveedor.nombre} ${partida.item?.categoria} ${partida.item?.descripcion}`}
        </Typography>

        <Typography variant="body2" gutterBottom>
          {`Partida ${partida.numeroPartida}    Kgs ${partida.kilos} | Und${partida.unidades}`}
        </Typography>

        <FormControl fullWidth margin="normal" disabled={true}>
          <InputLabel id="fila-label">Posiciones Vacias</InputLabel>
          <Select>
            <MenuItem value=""><em>None</em></MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" disabled={!!pasillo}>
          <InputLabel id="rack-label">Fila</InputLabel>
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

        <FormControl fullWidth margin="normal" disabled={!!pasillo}>
          <InputLabel id="fila-label">Rack</InputLabel>
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

        <FormControl fullWidth margin="normal" disabled={!!rack || !!fila || !!ab}>
          <InputLabel id="pasillo-label">Pasillo</InputLabel>
          <Select
            labelId="pasillo-label"
            value={pasillo}
            onChange={handlePasilloChange}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {Array.from({ length: 11 }, (_, index) => (
              <MenuItem key={index} value={index+1}>
                {`Pasillo ${index+1}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Kilos"
          type="number"
          value={kilos}
          onChange={handleKilosChange}
          variant="outlined"
        />

        <TextField
          fullWidth
          margin="normal"
          label="Unidades"
          type="number"
          value={unidades}
          onChange={handleUnidadesChange}
          variant="outlined"
        />

        <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={handleGuardar}>
            MERCADERIA APROBADA
          </Button>    
          <Button
            variant="contained"
            color="error"
            disabled={true} 
          >       
            DEVOLUCION
          </Button>
          <Button variant="outlined" color="secondary" onClick={limpiezaEstado}>
            Cancelar
          </Button>
        </Box>
        <ListadoKilosPartidaPorPosicion 
          distribucionDeKilosEnPosiciones={distribucionDeKilosEnPosiciones} 
          setDistribucionDeKilosEnPosiciones={setDistribucionDeKilosEnPosiciones}
        />
      </Box>
    </Modal>
  );
}; 