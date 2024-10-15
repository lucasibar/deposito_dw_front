import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom'; // Importar el hook useNavigate

export default function ListaPosiciones() {
  // Acceder a los valores desde Redux
  const posiciones = useSelector((state) => state.posiciones);
  const proveedorSeleccionado = useSelector((state) => state.proveedorSeleccionado);
  const itemSeleccionado = useSelector((state) => state.itemSeleccionado);
  const rackSeleccionado = useSelector((state) => state.rackSeleccionado);
  const filaSeleccionada = useSelector((state) => state.filaSeleccionada);

  const navigate = useNavigate(); // Hook para navegación

  const posicionesFiltradas = posiciones?.filter((posicion) => {
    const coincideProveedor = proveedorSeleccionado ? posicion.proveedor?.id === proveedorSeleccionado.id : true;
    const coincideItem = itemSeleccionado ? posicion.item?.id === itemSeleccionado.id : true;
    const coincideRack = rackSeleccionado ? posicion.rack === rackSeleccionado : true;
    const coincideFila = filaSeleccionada ? posicion.fila === filaSeleccionada : true;
    
    return coincideProveedor && coincideItem && coincideRack && coincideFila;
  });

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
            borderRadius: '16px',
            border: index === 0
              ? '2px solid green'
              : index === 1
              ? '2px solid blue'
              : null
          }}
          onClick={() => navigate(`/deposito_dw_front/descripcion-posicion/${posicion.id}`)} // Redirige con el ID
          style={{ cursor: 'pointer' }} // Hace que parezca un elemento clicable
        >
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