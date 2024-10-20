import * as React from 'react';
import { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import { Box } from '@mui/system';
import ManejadoresItems from './ManejadoresItems/ManejadoresItems'
import ManejadoresPosiciones from './ManejadoresPosiciones/ManejadoresPosiciones'


export default function Manejadores() {

  return (
    <Box sx={{ padding: 1 }}>
      <ManejadoresItems/>
      <ManejadoresPosiciones/>
    </Box>
  );
}