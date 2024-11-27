import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPosiciones } from '../../redux/actions';
import { Select, MenuItem, FormControl, InputLabel, Grid, Paper, Typography, Divider, Button } from '@mui/material';
import { Box } from '@mui/system';
import ListaPosiciones from './ListaPosiciones/ListaPosiciones'
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import BarraNavegador from '../Utils/BarraNavegador';
import BotonesNavegacion from '../Utils/BotonesNavegacion/BotonesNavegacion';


   export default function Stock() {
      const dispatch = useDispatch();
    
      const [inputBarraNavegador, setInputBarraNavegador]= useState("")
      useEffect(() => {
        dispatch(getPosiciones());
      }, []);
  
      return (
    <>
        <BarraNavegador titulo={"Der Will"} setInputBarraNavegador={setInputBarraNavegador}/>
        <BotonesNavegacion />
        <Box sx={{ padding: 2 }}>        
        <ListaPosiciones inputBarraNavegador={inputBarraNavegador}/>
        </Box>    
    </> 
  );
}