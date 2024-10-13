import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, MenuItem, FormControl, InputLabel, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ProveedoresSearchBar from './ProveedoresSearchBar/ProveedoresSearchBar';
import ItemsSearchBar from './ItemsSearchBar/ItemsSearchBar';

export default function Manejadores() {

  const proveedorSeleccionado = useSelector((state) => state.proveedorSeleccionado);
  return (
 <>
      {/* Selectores */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={4}>
          <ProveedoresSearchBar/>
        </Grid>
        {proveedorSeleccionado? 
        <>
        <Grid item xs={12} sm={4}>
        <ItemsSearchBar/>
        </Grid>

        </>
        :
        null
        }
      </Grid>


      </>
  );
}