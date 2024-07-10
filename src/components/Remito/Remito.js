import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataLoad, agragarCajaCuarentena } from '../../redux/actions'


import EntradaCaja from './EntradaCaja/EntradaCaja'
import ListaCajasRemito from './ListaCajasRemito/ListaCajasRemito'

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './Remito.css';
import CargarRemitoProveedor from './CargarRemitoProveedor';


export default function Remito(props) {
  
  const [remito, setRemito] = useState(null);
  const [proveedor, setProveedor] = useState("");

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
  dispatch(agragarCajaCuarentena(cajasRemito))
  //navigate('/deposito_dw_front/detalleremito');
  console.log("MANDE UNA PETICION", "archivo Remito en boton submitRemito")
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