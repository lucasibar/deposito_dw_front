import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function ListaPosiciones() {
  // Acceder a los valores desde Redux
  const posiciones = useSelector((state) => state.posiciones);
  const proveedorSeleccionado = useSelector((state) => state.proveedorSeleccionado);
  const itemSeleccionado = useSelector((state) => state.itemSeleccionado);
  const rackSeleccionado = useSelector((state) => state.rackSeleccionado);
  const filaSeleccionada = useSelector((state) => state.filaSeleccionada);

  // Filtrar posiciones combinando todos los filtros seleccionados
  const posicionesFiltradas = posiciones?.filter((posicion) => {
    // Filtrar por proveedor si está seleccionado
    const coincideProveedor = proveedorSeleccionado ? posicion.proveedor?.id === proveedorSeleccionado.id : true;
    
    // Filtrar por item si está seleccionado
    const coincideItem = itemSeleccionado ? posicion.item?.id === itemSeleccionado.id : true;
    
    // Filtrar por rack si está seleccionado
    const coincideRack = rackSeleccionado ? posicion.rack === rackSeleccionado : true;
    
    // Filtrar por fila si está seleccionada
    const coincideFila = filaSeleccionada ? posicion.fila === filaSeleccionada : true;

    // Solo incluir posiciones que coincidan con todos los filtros
    return coincideProveedor && coincideItem && coincideRack && coincideFila;
  });

  // Ordenar las posiciones por número de partida
  const posicionesOrdenadas = posicionesFiltradas?.sort((a, b) =>
    a.partida.numeroPartida - b.partida.numeroPartida
  );

  return (
    <Box sx={{ padding: 2 }}>
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
          {/* Mostrar si es una posición de entrada o no */}
          {!posicion.entrada ? (
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