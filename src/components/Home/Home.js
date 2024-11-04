import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dataProveedoresItems, getPosiciones } from '../../redux/actions';
import { Select, MenuItem, FormControl, InputLabel, Grid, Paper, Typography, Divider, Button } from '@mui/material';
import { Box } from '@mui/system';
import Manejadores from './Manejadores/Manejadores'
import CartaDataStock from './CartaDataStock/CartaDataStock';


import ListaPosiciones from './ListaPosiciones/ListaPosiciones'
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import NavBarPrincipal from '../Utils/NavBarPrincipal';



const LandingContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;  /* Centra vertical y horizontalmente */
text-align: center;
background-color: #0073e6; /* Color de fondo azul similar */
height: 100vh;
padding: 0 20px;

h1 {
  margin-bottom: 20px;  /* Separación entre el texto y el loading */
  font-size: 2em;
  font-family: 'Raleway', sans-serif; /* Fuente similar */
  font-weight: 700;
  color: white;
  
  @media (min-width: 768px) {
    font-size: 3em;
    }
    }
    `;
    
    
    
    
    
    export default function Home() {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      
      const posiciones = useSelector((state) => state.posiciones);
      
      useEffect(() => {
        dispatch(dataProveedoresItems())
        dispatch(getPosiciones());
      }, []);
  
      return (
        <>

    {!posiciones.length>0 ?
    <LandingContainer>
      <h1>Der Will</h1>
      <CircularProgress sx={{ color: 'white' }} /> 
    </LandingContainer>
:
<>
    <NavBarPrincipal titulo={"Der Will"}/>
    <Box sx={{ padding: 2 }}>
      <Manejadores/>
      <Divider sx={{ marginY: '10px' }} />
      
      <CartaDataStock />
      <ListaPosiciones/>
    </Box>    
    </>}
    </>
  );
}