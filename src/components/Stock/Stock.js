import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataProveedoresItems } from '../../redux/actions';
import { Select, MenuItem, FormControl, InputLabel, Grid, Paper, Typography, Divider, Button } from '@mui/material';
import { Box } from '@mui/system';
import Manejadores from './Manejadores/Manejadores'
import CartaDataStock from './CartaDataStock/CartaDataStock'
import ListaPosiciones from './ListaPosiciones/ListaPosiciones'
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';


function usuarioNohabilitado() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Usuario no habilitado",
  });
}

export default function Stock() {
  const dispatch = useDispatch();
  
  const proveedorSeleccionado = useSelector((state) => state.proveedorSeleccionado);

  
  useEffect(() => {
    dispatch(dataProveedoresItems())
  }, []);
  
  return (
    <Box sx={{ padding: 2 }}>
      <Manejadores/>
      <Divider sx={{ marginY: '20px' }} />

{!proveedorSeleccionado?
  <>
  <NavLink to="/deposito_dw_front/remito" className="navButton">
        <Button fullWidth variant="outlined">REMITO ENTRADA</Button>
      </NavLink>
      <NavLink to="/deposito_dw_front/cuarentena" className="navButton">
        <Button fullWidth variant="outlined">MERCADERIA EN CUARENTENA</Button>
      </NavLink>

      <Divider sx={{ marginY: '10px' }} />

      <NavLink to="/deposito_dw_front/salidas" className="navButton">
        <Button fullWidth variant="outlined">REMITO SALIDA</Button>
      </NavLink>
      <NavLink to="/deposito_dw_front/salidas" className="navButton">
        <Button fullWidth variant="outlined"> HISTORIAL SALIDAS</Button>
      </NavLink>

      <Divider sx={{ marginY: '10px' }} />

      <NavLink to="/deposito_dw_front/posiciones" className="navButton">
        <Button fullWidth variant="outlined">POSICIONES</Button>
      </NavLink>

      <Divider sx={{ marginY: '20px' }} />

      <div className="navButton">
        <Button fullWidth variant="outlined" onClick={usuarioNohabilitado}>
          DASHBOARD ADMINISTRADOR
        </Button>
      </div>
      </>
:
<>

      <CartaDataStock/>
      <ListaPosiciones/>
</>
}



    </Box>
  );
}