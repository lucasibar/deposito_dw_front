import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { subirRemitoSalida } from '../../redux/actions'
import {URL} from '../../redux/actions'

import ListaSalidaMercaderia from './ListaSalidaMercaderia/ListaSalidaMercaderia'


import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NavBar from '../../components/NavBar/NavBar';
import DatosRemito from './DatosRemito/DatosRemito';
import SalidasForm from './SalidasForm/SalidasForm';


export default function Remito(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const numeroRemito = useSelector((state) => state.numeroRemito); 
  const proveedor = useSelector((state) => state.proveedor);
  const fechaRemito = useSelector((state) => state.fechaRemito);


  const partidasRemitoSalida = useSelector((state) => state.partidasRemitoSalida);
  async function submitRemito(){
    let datosRemito= {
      proveedor: proveedor,
      numeroRemito: numeroRemito,
      fechaRemito:fechaRemito
    }
    dispatch(subirRemitoSalida({tipoMovimiento:"salida", partidasRemitoSalida, datosRemito}))
    // navigate('/deposito_dw_front/');
  }

  return (
    <div>

    

      {numeroRemito && proveedor && fechaRemito?
      <>
      <NavBar titulo="Remito de salida"/>
        
      <SalidasForm/>
      
      <Button onClick={submitRemito} sx={{ width: '350px', mt: '30px'}} variant="contained">SUBIR REMITO</Button>
      
      <ListaSalidaMercaderia /> 
      </>
      :
      <DatosRemito />
      }
        


    </div>
  );
}