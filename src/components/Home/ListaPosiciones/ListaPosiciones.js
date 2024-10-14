import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Box } from '@mui/system';

export default function ListaPosicionesFiltrada() {
  // Obtener todas las posiciones del estado de Redux
  const posicionesPorProveedor = useSelector((state) => state.posicionesPorProveedor);
  
  // Obtener todos los proveedores y items para los filtros (asumiendo que están disponibles en el estado)
  const proveedores = useSelector((state) => state.proveedores); 
  const items = useSelector((state) => state.items);
  
  // Estados locales para los filtros
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState('');
  const [itemSeleccionado, setItemSeleccionado] = useState('');
  const [rackSeleccionado, setRackSeleccionado] = useState('');
  const [filaSeleccionada, setFilaSeleccionada] = useState('');
  const [depositoSeleccionado, setDepositoSeleccionado] = useState('');

  // Función para manejar los cambios en los filtros
  const handleFiltroChange = (setter) => (event) => setter(event.target.value);

  // Filtrar las posiciones en base a los filtros seleccionados
  const posicionesFiltradas = posicionesPorProveedor
    ?.filter((posicion) => 
      (!proveedorSeleccionado || posicion.proveedor === proveedorSeleccionado) &&
      (!itemSeleccionado || posicion.item.id === itemSeleccionado) &&
      (!rackSeleccionado || posicion.rack === rackSeleccionado) &&
      (!filaSeleccionada || posicion.fila === filaSeleccionada) &&
      (!depositoSeleccionado || posicion.deposito === depositoSeleccionado)
    );

  // Ordenar las posiciones filtradas por número de partida de menor a mayor
  const posicionesOrdenadas = posicionesFiltradas?.sort((a, b) => 
    a.partida.numeroPartida - b.partida.numeroPartida
  );

  return (
    <Box sx={{ padding: 2 }}>
      {/* Filtros */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        {/* Selector de Proveedor */}
        <FormControl fullWidth>
          <InputLabel>Proveedor</InputLabel>
          <Select
            value={proveedorSeleccionado}
            onChange={handleFiltroChange(setProveedorSeleccionado)}
          >
            <MenuItem value=""><em>Todos</em></MenuItem>
            {proveedores?.map((proveedor) => (
              <MenuItem key={proveedor.id} value={proveedor.nombre}>
                {proveedor.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Selector de Item */}
        <FormControl fullWidth>
          <InputLabel>Item</InputLabel>
          <Select
            value={itemSeleccionado}
            onChange={handleFiltroChange(setItemSeleccionado)}
          >
            <MenuItem value=""><em>Todos</em></MenuItem>
            {items?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Selector de Rack */}
        <FormControl fullWidth>
          <InputLabel>Rack</InputLabel>
          <Select
            value={rackSeleccionado}
            onChange={handleFiltroChange(setRackSeleccionado)}
          >
            <MenuItem value=""><em>Todos</em></MenuItem>
            {posicionesPorProveedor?.map((posicion, index) => (
              <MenuItem key={index} value={posicion.rack}>
                {posicion.rack}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Selector de Fila */}
        <FormControl fullWidth>
          <InputLabel>Fila</InputLabel>
          <Select
            value={filaSeleccionada}
            onChange={handleFiltroChange(setFilaSeleccionada)}
          >
            <MenuItem value=""><em>Todos</em></MenuItem>
            {posicionesPorProveedor?.map((posicion, index) => (
              <MenuItem key={index} value={posicion.fila}>
                {posicion.fila}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Selector de Depósito */}
        <FormControl fullWidth>
          <InputLabel>Depósito</InputLabel>
          <Select
            value={depositoSeleccionado}
            onChange={handleFiltroChange(setDepositoSeleccionado)}
          >
            <MenuItem value=""><em>Todos</em></MenuItem>
            {posicionesPorProveedor?.map((posicion, index) => (
              <MenuItem key={index} value={posicion.deposito}>
                {posicion.deposito}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Mostrar posiciones filtradas */}
      {posicionesOrdenadas?.map((posicion, index) => (
        <Paper
          key={index}
          elevation={3}
          sx={{
            padding: 2,
            marginBottom: 2,
            border: index === 0
              ? '4px solid green'  // Borde verde para la primera carta
              : index === 1
              ? '4px solid blue'   // Borde azul para la segunda carta
              : '1px solid gray',   // Borde normal para las demás cartas
          }}
        >
          {posicion.entrada ? (
            <Typography variant="subtitle1">
              {posicion.pasillo
                ? `Pasillo: ${posicion.pasillo}`
                : `Posición: ${posicion.rack}-${posicion.fila}-${posicion.AB}`}
            </Typography>
          ) : (
            <Typography variant="subtitle1">Posición: Cuarentena</Typography>
          )}

          <Typography variant="body2">Número de Partida: {posicion.partida.numeroPartida}</Typography>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Typography variant="body2">Kilos: {posicion.kilos}</Typography>
            <Typography variant="body2">Unidades: {posicion.unidades}</Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}