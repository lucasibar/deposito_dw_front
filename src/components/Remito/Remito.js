import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataLoad, agragarCajasRemito } from '../../redux/actions'
import './Remito.css';


import EntradaCaja from './EntradaCaja/EntradaCaja'
import ListaCajasRemito from './ListaCajasRemito/ListaCajasRemito'
import CargarRemitoProveedor from './CargarRemitoProveedor';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default function Remito(props) {
  
  const [remito, setRemito] = useState(0);
  const [proveedor, setProveedor] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dataLoad())
  }, [dispatch]);


  const items = useSelector((state) => state.items);
  const [itemsDescripciones, setIiemsDescripciones] = useState([]); 
  useEffect(() => {
    if (items.length > 0) {
      const descripcionItems = items.map((item) => item.descripcion);
      setIiemsDescripciones(descripcionItems);
    }
  }, [items, setIiemsDescripciones]);



const cajasRemito = useSelector((state) => state.cajasRemito);//PARA PROBAR LAS PETICIONES AL SERVER
function submitRemito(){
  for (let i=0; i<cajasRemito.length; i++){
    cajasRemito[i].proveedor= proveedor
    cajasRemito[i].numeroRemito= remito
  }
  dispatch(agragarCajasRemito(cajasRemito))
  //navigate('/deposito_dw_front/detalleremito');
}

function cargarRemitoProveedor(numeroRemito, proveedor){
  setRemito(numeroRemito)
  setProveedor(proveedor)
}

  return (
    <div>

    

      {remito && proveedor?
      <>
      <AppBar position="static">
        <Toolbar variant="dense" className="toolbar">
          <Typography variant="h6" color="inherit" component="div" className="left">
            Remito {remito ? `${remito}` : "00000"}
          </Typography>
          <Typography variant="h6" color="inherit" component="div" className="right">
            {proveedor}
          </Typography>
        </Toolbar>
      </AppBar>
        
      <EntradaCaja items={items} itemsDescripciones={itemsDescripciones}/>
      <Button onClick={submitRemito} sx={{ width: '350px', mt: '30px'}} variant="contained">SUBIR REMITO</Button>
      <ListaCajasRemito items={items}/> 
      </>
      :
      <CargarRemitoProveedor confirmar={cargarRemitoProveedor}/>
      }
        


    </div>
  );
}