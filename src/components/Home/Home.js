import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataProveedoresItems, getPosiciones } from '../../redux/actions';
import { Select, MenuItem, FormControl, InputLabel, Grid, Paper, Typography, Divider, Button } from '@mui/material';
import { Box } from '@mui/system';
import Manejadores from './Manejadores/Manejadores'
import CartaDataStock from './CartaDataStock/CartaDataStock'
import ListaPosiciones from './ListaPosiciones/ListaPosiciones'
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Home() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPosiciones());

    dispatch(dataProveedoresItems())
  }, []);
  
  return (
    <Box sx={{ padding: 2 }}>
      <Manejadores/>
      <Divider sx={{ marginY: '20px' }} />
      <ListaPosiciones/>
    </Box>
  );
}