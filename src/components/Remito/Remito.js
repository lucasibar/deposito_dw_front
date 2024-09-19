import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { subirRemito} from '../../redux/actions'
import './Remito.css';
import FormRemito from './FormRemito/FormRemito'
import DetalleRemito from './DetalleRemito/DetalleRemito'
import ListaPartidasRemito from './ListaPartidasRemito/ListaPartidasRemito'
import CargarRemitoProveedor from './CargarRemitoProveedor';

import Button from '@mui/material/Button';
import NavBar from '../NavBar/NavBar';


export default function Remito(props) {
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
      <NavBar titulo={ `Remito recepcion`}/>
        
      <FormRemito />
      {/* {numeroRemito && proveedor?
      <>
      <DetalleRemito />

      <Button onClick={submitRemito} sx={{ width: '350px', mt: '30px'}} variant="contained">SUBIR REMITO</Button>
      
      <ListaPartidasRemito /> 
      </>
      :
      <CargarRemitoProveedor />
      } */}
      
    </div>
  );
}