import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovimientosSalida } from '../../redux/actions';
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
    dispatch(fetchMovimientosSalida())
  }, []);
  
  const movimientos = useSelector((state) => state.movimientosHistoricoSalida);


  return (
    <>
    <NavBar titulo={"Historial de salida"}/>
    <Box>
     
    </Box>
    </>
  );
}
