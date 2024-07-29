import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { subirRemito, limpiarDatosRemito, dataLoad } from '../../redux/actions'
import './Remito.css';


import PartidasRemito from './PartidasRemito/PartidasRemito'
import ListaPartidasRemito from './ListaPartidasRemito/ListaPartidasRemito'
import CargarRemitoProveedor from './CargarRemitoProveedor';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import axios from 'axios';


export default function Remito(props) {
  const navigate = useNavigate();
  
  const numeroRemito = useSelector((state) => state.numeroRemito); 
  const proveedor = useSelector((state) => state.proveedor);
  const fechaRemito = useSelector((state) => state.fechaRemito);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(dataLoad())
  },[dispatch])

  const items = useSelector((state) => state.items);
  const [itemsDescripciones, setItemsDescripciones] = useState([]); 
  useEffect(() => {
    if (items.length > 0) {
      const descripcionItems = items.map((item) => item.descripcion);
      setItemsDescripciones(descripcionItems);
    }
  }, [items, setItemsDescripciones]);



const partidasRemito = useSelector((state) => state.partidasRemito);//PARA PROBAR LAS PETICIONES AL SERVER
async function submitRemito(){
  
    let datosRemito= {
      proveedor: proveedor,
      numeroRemito: numeroRemito,
      fechaRemito:fechaRemito
    }

   await axios.post(`http://localhost:3001/movimientos/entrada`, {partidasRemito, datosRemito} ) 
    .then(data => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500
      });
      })
      .catch(error => {
          console.error("Error in datosBaseRemito:", error);
      });
  navigate('/deposito_dw_front/detalleremito');
}

function volverHome(){
      navigate('/deposito_dw_front/'); 
    }

  return (
    <div>

    

      {numeroRemito && proveedor?
      <>
      <AppBar position="static">
        <Toolbar variant="dense" className="toolbar">
          <Typography  variant="h6" color="inherit" component="div" className="left">
            Remito {numeroRemito ? `${numeroRemito}` : "00000"}
          </Typography>
          <Typography variant="h6" color="inherit" component="div" className="right">
            {proveedor}
          </Typography>
          <ChevronLeftIcon onClick={volverHome}/>

        </Toolbar>
      </AppBar>
        
      <PartidasRemito itemsDescripciones={itemsDescripciones}/>
      <Button onClick={submitRemito} sx={{ width: '350px', mt: '30px'}} variant="contained">SUBIR REMITO</Button>
      <ListaPartidasRemito /> 
      </>
      :
      <CargarRemitoProveedor />
      }
        


    </div>
  );
}