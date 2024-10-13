import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function ListaPosiciones() {
  // Obtener posiciones por proveedor y el item seleccionado del estado de Redux
  const posicionesPorProveedor = useSelector((state) => state.posicionesPorProveedor);
  const itemSeleccionado = useSelector((state) => state.itemSeleccionado); // Asumiendo que hay un reducer que guarda el item seleccionado

  // Filtrar las posiciones donde coincida el item seleccionado, si hay uno seleccionado
  const posicionesFiltradas = posicionesPorProveedor?.filter((posicion) =>
    itemSeleccionado ? posicion.item.id === itemSeleccionado.id : true
  );

  // Ordenar las posiciones por número de partida de menor a mayor
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