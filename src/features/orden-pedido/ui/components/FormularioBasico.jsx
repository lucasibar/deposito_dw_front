import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { updateOrden, setClienteSeleccionado, setDialogCliente } from '../../model/slice';

const FormularioBasico = () => {
  const dispatch = useDispatch();
  const { orden, clientes } = useSelector(state => state.ordenPedido);

  const handleOrdenChange = (e) => {
    dispatch(updateOrden({ [e.target.name]: e.target.value }));
  };

  const handleClienteChange = (e) => {
    if (e.target.value === "nuevo-cliente") {
      dispatch(setDialogCliente(true));
      return;
    }
    const cliente = clientes.find((c) => c.id === e.target.value);
    dispatch(setClienteSeleccionado(cliente));
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '5px'
      }}>
        <TextField
          fullWidth
          size="small"
          label="Número de Orden"
          name="numeroPO"
          value={orden.numeroPO}
          onChange={handleOrdenChange}
          required
        />
        <TextField
          fullWidth
          size="small"
          type="date"
          label="Fecha"
          name="fecha"
          value={orden.fecha}
          onChange={handleOrdenChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <FormControl fullWidth size="small">
          <InputLabel>Cliente</InputLabel>
          <Select
            value={orden.clienteId}
            onChange={handleClienteChange}
            label="Cliente"
            required
          >
            <MenuItem value="nuevo-cliente" style={{ color: "blue", fontWeight: "bold" }}>
              Nuevo Cliente
            </MenuItem>
            {clientes.map((cliente) => (
              <MenuItem key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default FormularioBasico; 