import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { stockTotalItem } from '../../../redux/actions';

export default function CartaDataStock() {
  const dispatch = useDispatch();
  const itemSeleccionado = useSelector((state) => state.itemSeleccionado);
  const stockItemSeleccionado = useSelector((state) => state.stockItemSeleccionado);

  useEffect(() => {
    if (itemSeleccionado) {
      dispatch(stockTotalItem(itemSeleccionado.id));
    }
  }, [itemSeleccionado, dispatch]);

  return (
    <Grid container spacing={2} sx={{ marginTop: 1 }}>
      {/* Stock Actual o Cuarentena */}
      <Grid item xs={6} sm={6} md={6}>
        {itemSeleccionado ? (
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              backgroundColor: '#1976d2',
              color: 'white',
              marginBottom: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="subtitle2">Stock Actual</Typography>
            <Typography variant="h6">
              {stockItemSeleccionado || "Cantidad de Kilos"}
            </Typography>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography variant="subtitle2">Consumo Promedio</Typography>
              <Typography variant="subtitle2">Consumo Diario</Typography>
            </Box>
          </Paper>
        ) : (
          <NavLink to="/deposito_dw_front/cuarentena" className="navButton">
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                backgroundColor: '#1976d2',
                color: 'white',
                marginBottom: 2,
                textAlign: 'center', // Centrar el texto verticalmente
              }}
            >
              <Typography variant="h6">Cuarentena</Typography>
            </Paper>
          </NavLink>
        )}
      </Grid>

      {/* Salida */}
      <Grid item xs={6} sm={6} md={6}>
        <NavLink to="/deposito_dw_front/salida" className="navButton">
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              border: '1px solid #1976d2',
              backgroundColor: 'white',
              color: '#1976d2',
              marginBottom: 2,
              textAlign: 'center', // Centrar el texto verticalmente
            }}
          >
            <Typography variant="h6">Salida</Typography>
          </Paper>
        </NavLink>
      </Grid>
    </Grid>
  );
}
