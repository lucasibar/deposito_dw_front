import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import Swal from 'sweetalert2';

export default function ModalPopup({ open, handleClose, item, posicionActualId }) {
  const dispatch = useDispatch();

  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [itemSeleccionado, setItemSeleccionado] = useState('');
  const [numeroPartida, setNumeroPartida] = useState('');
  const [rack, setRack] = useState('');
  const [fila, setFila] = useState('');
  const [ab, setAB] = useState('');
  const [pasillo, setPasillo] = useState('');
  const [kilos, setKilos] = useState('');
  const [unidades, setUnidades] = useState('');

  function limpiezaEstado() {
    setOpcionSeleccionada('');
    setProveedor('');
    setItemSeleccionado('');
    setNumeroPartida('');
    setRack('');
    setFila('');
    setAB('');
    setPasillo('');
    setKilos('');
    setUnidades('');
    handleClose();
  }

  const handleOpcionChange = (event) => {
    setOpcionSeleccionada(event.target.value);
    // Limpiar campos cuando cambia la opción
    setProveedor('');
    setItemSeleccionado('');
    setNumeroPartida('');
    setRack('');
    setFila('');
    setAB('');
    setPasillo('');
    setKilos('');
    setUnidades('');
  };

  const handleGuardar = () => {
    if (opcionSeleccionada === 'Movimiento Interno') {
    } else if (opcionSeleccionada === 'Ajuste RESTA mercaderia' || opcionSeleccionada === 'Ajuste SUMA mercaderia') {
          alert("Falta hacer la logica de los ajustes porn el momento") 
    } else if (opcionSeleccionada === 'Agragar al remito de Salida') {
    
    }
    limpiezaEstado();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={limpiezaEstado}
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
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            {`${item.proveedor.nombre} ${item.categoria} ${item.descripcion}`}
          </Typography>

          <Typography variant="body2" gutterBottom>
            {`Partida ${item.partida}    Kgs ${item.kilos} | Und ${item.unidades}`}
          </Typography>

          {/* Nuevo Selector para las opciones principales */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="opcion-label">Selecciona una opción</InputLabel>
            <Select
              labelId="opcion-label"
              value={opcionSeleccionada}
              onChange={handleOpcionChange}
            >
              <MenuItem value=""><em>Ninguna</em></MenuItem>
              <MenuItem value="Agragar al remito de Salida">Agragar al remito de Salida</MenuItem>
              <MenuItem value="Ajuste RESTA mercaderia">Ajuste RESTA mercaderia</MenuItem>
              <MenuItem value="Ajuste SUMA mercaderia">Ajuste SUMA mercaderia</MenuItem>
              <MenuItem value="Movimiento Interno">Movimiento Interno</MenuItem>
            </Select>
          </FormControl>

          {/* Mostrar campos según la opción seleccionada */}
          {opcionSeleccionada === 'Agragar al remito de Salida' && (
            <>
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
          )}

          {(opcionSeleccionada === 'Ajuste RESTA mercaderia' || opcionSeleccionada === 'Ajuste SUMA mercaderia') && (
            <>
              {/* Selector de Proveedor */}
              <FormControl fullWidth margin="normal">
                <InputLabel id="proveedor-label">Proveedor</InputLabel>
                <Select
                  labelId="proveedor-label"
                  value={proveedor}
                  onChange={(e) => setProveedor(e.target.value)}
                >
                  <MenuItem value=""><em>Ninguno</em></MenuItem>
                  {/* Añade más opciones según los proveedores */}
                  <MenuItem value="Proveedor 1">Proveedor 1</MenuItem>
                  <MenuItem value="Proveedor 2">Proveedor 2</MenuItem>
                </Select>
              </FormControl>

              {/* Selector de Item */}
              <FormControl fullWidth margin="normal">
                <InputLabel id="item-label">Item</InputLabel>
                <Select
                  labelId="item-label"
                  value={itemSeleccionado}
                  onChange={(e) => setItemSeleccionado(e.target.value)}
                >
                  <MenuItem value=""><em>Ninguno</em></MenuItem>
                  {/* Añade más opciones según los items */}
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
          )}

          {opcionSeleccionada === 'Movimiento Interno' && (
            <>
              {/* Selectores e Inputs de Movimiento Interno */}
              <FormControl fullWidth margin="normal">
                <InputLabel id="rack-label">Rack</InputLabel>
                <Select
                  labelId="rack-label"
                  value={rack}
                  onChange={(e) => setRack(e.target.value)}
                >
                  <MenuItem value=""><em>Ninguno</em></MenuItem>
                  {Array.from({ length: 20 }, (_, index) => (
                    <MenuItem key={index + 1} value={index + 1}>
                      {`Rack ${index + 1}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel id="fila-label">Fila</InputLabel>
                <Select
                  labelId="fila-label"
                  value={fila}
                  onChange={(e) => setFila(e.target.value)}
                >
                  <MenuItem value=""><em>Ninguno</em></MenuItem>
                  {Array.from({ length: 14 }, (_, index) => (
                    <MenuItem key={index + 1} value={index + 1}>
                      {`Fila ${index + 1}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

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

              <FormControl fullWidth margin="normal">
                <InputLabel id="pasillo-label">Pasillo</InputLabel>
                <Select
                  labelId="pasillo-label"
                  value={pasillo}
                  onChange={(e) => setPasillo(e.target.value)}
                >
                  <MenuItem value=""><em>Ninguno</em></MenuItem>
                  {Array.from({ length: 22 }, (_, index) => (
                    <MenuItem key={index} value={index}>
                      {`Pasillo ${index}`}
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
          )}

          {/* Botones */}
          <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGuardar}
              disabled={!opcionSeleccionada} // Deshabilitar hasta que se seleccione una opción
            >
              MERCADERIA APROBADA
            </Button>
            <Button variant="outlined" color="secondary" onClick={limpiezaEstado}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}