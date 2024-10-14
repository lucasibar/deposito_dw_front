import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';


export default function CartaDataStock() {

  return (
<>

      <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#1976d2', color: 'white', marginBottom: 2 }}>
        <Typography variant="subtitle2">Stock Actual</Typography>
        <Typography variant="h4">Cantidad de Kilos</Typography>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="subtitle2">Consumo Promedio</Typography>
          <Typography variant="subtitle2">Consumo Diario</Typography>
        </Box>
      </Paper>
</>
  );
}