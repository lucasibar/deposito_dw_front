import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { subirPartidasDelRemito, limpiarDatosRemito, dataLoad } from '../../redux/actions'
import './Remito.css';


import PartidasRemito from './PartidasRemito/PartidasRemito'
import ListaPartidasRemito from './ListaPartidasRemito/ListaPartidasRemito'
import CargarRemitoProveedor from './CargarRemitoProveedor';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


export default function Remito(props) {
  const navigate = useNavigate();
  
  const remito = useSelector((state) => state.numeroRemito); 
  const proveedor = useSelector((state) => state.proveedor);

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
function submitRemito(){
  for (let i=0; i<partidasRemito.length; i++){
    partidasRemito[i].proveedor= proveedor
    partidasRemito[i].numeroRemito= remito
  }
  dispatch(subirPartidasDelRemito(partidasRemito))
  //navigate('/deposito_dw_front/detalleremito');
}

function cambiarDatosRemito(){
    Swal.fire({
    title: "Queres cambiar los datos del remito?",
    text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(limpiarDatosRemito());
      navigate('/deposito_dw_front/remito'); 
    }
  });
}

  return (
    <div>

    

      {remito && proveedor?
      <>
      <AppBar position="static">
        <Toolbar variant="dense" className="toolbar">
          <Typography  variant="h6" color="inherit" component="div" className="left">
            Remito {remito ? `${remito}` : "00000"}
          </Typography>
          <Typography variant="h6" color="inherit" component="div" className="right">
            {proveedor}
          </Typography>
          <ChevronLeftIcon onClick={cambiarDatosRemito}/>

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