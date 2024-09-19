import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { subirRemito, limpiarDatosRemito, dataLoad } from '../../redux/actions'
import './Remito.css';
import {URL} from '../../redux/actions'


import DetalleRemito from './DetalleRemito/DetalleRemito'
import ListaPartidasRemito from './ListaPartidasRemito/ListaPartidasRemito'
import CargarRemitoProveedor from './CargarRemitoProveedor';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NavBar from '../NavBar/NavBar';


export default function Remito(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const numeroRemito = useSelector((state) => state.numeroRemito); 
  const proveedor = useSelector((state) => state.proveedor);
  const fechaRemito = useSelector((state) => state.fechaRemito);
  // const categoriaMercaderiaRemito = useSelector((state) => state.categoriaMercaderiaRemito);


const partidasRemito = useSelector((state) => state.partidasRemito);//PARA PROBAR LAS PETICIONES AL SERVER
async function submitRemito(){
  
    let datosRemito= {
      proveedor: proveedor,
      numeroRemito: numeroRemito,
      fechaRemito:fechaRemito
    }
    dispatch(subirRemito({tipoMovimiento:"remito", partidasRemito, datosRemito}))
  navigate('/deposito_dw_front/');
}

  return (
    <div>

    

      {numeroRemito && proveedor?
      <>
      <NavBar titulo={ `Remito  ${numeroRemito}`} subtitulo={proveedor}/>
        
      <DetalleRemito />

      <Button onClick={submitRemito} sx={{ width: '350px', mt: '30px'}} variant="contained">SUBIR REMITO</Button>
      
      <ListaPartidasRemito /> 
      </>
      :
      <CargarRemitoProveedor />
      }
        


    </div>
  );
}