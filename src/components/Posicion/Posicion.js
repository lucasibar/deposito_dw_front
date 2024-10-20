import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // Para obtener el id de la posición desde params
import { obtenerItemsPorPosicion } from '../../redux/actions'; // Asegúrate de que esta acción esté definida
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import NavBar from '../NavBar/NavBar';


export default function Posicion() {
  const { id } = useParams(); // Obtener el id de la posición desde los params
  const dispatch = useDispatch();

  // Estado para los ítems asignados a la posición
  const itemsPosicion = useSelector((state) => state.itemsPosicion);

  // Cargar los ítems de la posición al montar el componente
  useEffect(() => {
    dispatch(obtenerItemsPorPosicion(id)); // Dispatch para obtener los ítems según la posición
  }, [dispatch, id]);

  return (
    <>
<NavBar titulo={`Posicion ` }/>
    <Box sx={{ padding: 2 }}>
      {/* Verificar si hay items para mostrar */}
      {itemsPosicion.length > 0 ? (
        itemsPosicion.map((item, index) => (
          <Paper
            key={index}
            sx={{
              padding: 2,
              marginBottom: 2,
              borderRadius: '16px',
              border: index === 0 ? '2px solid green' : null,
              cursor: 'pointer',
            }}
          >
            {/* Mostrar información del item */}
            <Typography variant="subtitle1">
              Número de Partida: {item.partida}
            </Typography>
            <Typography variant="body2" mt={2}>
              Proveedor: {item.proveedor.nombre}
            </Typography>
            <Typography variant="body2" mt={2}>
              Kilos: {item.kilos} - Unidades: {item.unidades}
            </Typography>
          </Paper>
        ))
      ) : (
        <Typography variant="body2" mt={2}>
          No se encontraron ítems para esta posición.
        </Typography>
      )}
    </Box>
    </>
  );
}