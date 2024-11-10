import * as React from 'react';
import ProveedoresSearchBar from './ProveedoresSearchBar/ProveedoresSearchBar'
import ListaMovimientosRemitoSalida from './ListaMovimientosRemitoSalida/ListaMovimientosRemitoSalida'
import NavBar from '../Utils/NavBar';
import { Divider } from '@mui/material';


export default function Salida(props) {
  
  return (
    <div>
      <NavBar titulo={ `Remito salida`}/>
      <ProveedoresSearchBar />
      <Divider sx={{ marginY: '20px' }} />

      <ListaMovimientosRemitoSalida /> 
      
    </div>
  );
}