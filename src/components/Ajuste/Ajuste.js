import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { subirRemito, limpiarDatosRemito, dataLoad } from '../../redux/actions'
import './Remito.css';
import {URL} from '../../redux/actions'


import DetalleAjuste from './DetalleAjuste/DetalleAjuste'
import ListaPartidasRemito from './ListaPartidasRemito/ListaPartidasRemito'
import CargarRemitoProveedor from './CargarRemitoProveedor';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NavBar from '../NavBar/NavBar';


export default function Ajuste(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const numeroRemito = useSelector((state) => state.numeroRemito); 
  const proveedor = useSelector((state) => state.proveedor);
  const fechaRemito = useSelector((state) => state.fechaRemito);


  const items = useSelector((state) => state.items);
  const [itemsDescripciones, setItemsDescripciones] = useState([]); 
  useEffect(() => {
    if (items.length > 0) {
      const descripcionItems = items.map((item) => item.descripcion);
      setItemsDescripciones(descripcionItems);
    }
  }, [items, setItemsDescripciones]);



const partidasRemito = useSelector((state) => state.partidasRemito);//PARA PROBAR LAS PETICIONES AL SERVER
// async function submitAjuste(){
//     dispatch(subirAjuste({tipoMovimiento:"remito", partidasRemito, datosRemito}))
//   navigate('/deposito_dw_front/');
// }

  return (
    <div>

      <NavBar titulo={"Ajuste"}/>
        
      <DetalleAjuste />

    </div>
  );
}