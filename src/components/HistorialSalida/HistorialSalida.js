import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovimientos } from '../../redux/actions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Typography, Box } from '@mui/material';
import axios from 'axios';
import NavBar from '../Utils/NavBar';

export default function HistorialSalida() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(fetchMovimientos())
  }, []);
  
  const movimientos = useSelector((state) => state.movimientosHistoricoSalida);



  // Agrupar los movimientos por fecha y luego por proveedor
  const movimientosPorFecha = movimientos?.reduce((acc, movimiento) => {
    const fecha = movimiento.fecha.split('T')[0]; // Obtiene solo la parte de la fecha sin la hora
    if (!acc[fecha]) {
      acc[fecha] = {};
    }
    
    // Agrupar por proveedor dentro de cada fecha
    const proveedor = movimiento.proveedor.nombre;
    if (!acc[fecha][proveedor]) {
      acc[fecha][proveedor] = [];
    }
    
    acc[fecha][proveedor].push(movimiento);
    return acc;
  }, {});

  return (
    <>
    <NavBar titulo={"Historial de salida"}/>
    <Box>
      {Object.keys(movimientosPorFecha).map((fecha, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          {/* Título con la fecha */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            {fecha}
          </Typography>

          {/* Lista de proveedores para esa fecha */}
          {Object.keys(movimientosPorFecha[fecha]).map((proveedor, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              {/* Título con el proveedor */}
              <Typography variant="body1" sx={{ fontWeight: 'bold', ml: 2 }}>
                {proveedor}
              </Typography>

              {/* Lista de items para ese proveedor */}
              <List sx={{ pl: 4 }}>
                {movimientosPorFecha[fecha][proveedor].map((movimiento, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${movimiento.item.categoria} ${movimiento.item.descripcion} - Kilos: ${movimiento.kilos}, Unidades: ${movimiento.unidades} (Partida: ${movimiento.partida.numeroPartida})`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
    </>
  );
}
