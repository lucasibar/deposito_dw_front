import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { Select, MenuItem, FormControl, InputLabel, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { NavLink } from 'react-router-dom';
import { stockTotalItem } from '../../../redux/actions';


export default function CartaDataStock() {


  const dispatch = useDispatch();
  const itemSeleccionado = useSelector((state) => state.itemSeleccionado);
  
  useEffect(() => {
    itemSeleccionado && dispatch(stockTotalItem(itemSeleccionado.id))
  }, [itemSeleccionado]);
  
  
  
  const stockItemSeleccionado = useSelector((state) => state.stockItemSeleccionado);

  
  return (
<>
{itemSeleccionado?
      <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#1976d2', color: 'white', marginBottom: 2 }}>
      <Typography variant="subtitle2">Stock Actual</Typography>
      <Typography variant="h6">{stockItemSeleccionado? stockItemSeleccionado :"Cantidad de Kilos"}</Typography>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Typography variant="subtitle2">Consumo Promedio</Typography>
        <Typography variant="subtitle2">Consumo Diario</Typography>
      </Box>
    </Paper>

:
<NavLink to="/deposito_dw_front/cuarentena" className="navButton">
  <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#1976d2', color: 'white', marginBottom: 2 }}>
    <Typography variant="subtitle2"></Typography>
    <Typography variant="h6">Mercaderia en cuarentena</Typography>
  </Paper>
</NavLink>
}

</>
  );
}