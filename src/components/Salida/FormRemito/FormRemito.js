import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { subirRemitoBDD } from '../../../redux/actions';
import './FormRemito.css'; 
import ProveedoresSearchBar from './ProveedoresSearchBar/ProveedoresSearchBar'
import ItemsSearchBar from './ItemsSearchBar/ItemsSearchBar'

export default function FormRemito() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const proveedorSeleccionado = useSelector((state) => state.proveedorSeleccionado);
  const fechaSeleccionado = useSelector((state) => state.fechaSeleccionado);
  const numeroRemitoSeleccionado = useSelector((state) => state.numeroRemitoSeleccionado);
  const partidasRemito = useSelector((state) => state.partidasRemito);
  
  
    async function submitRemito(){
      let remito = {
        proveedorSeleccionado,
        fechaSeleccionado,
        numeroRemitoSeleccionado,
        partidasRemito,
        tipoMovimiento:"remitoSalida"
      }
    // dispatch(subirRemitoSalida(remito))
    // dispatch(limpiarProveedorSeleccionado())
    navigate('/deposito_dw_front/');
  }


    return (
      <>
      <ProveedoresSearchBar />
      <Divider sx={{ marginY: '20px' }} />
      {!proveedorSeleccionado? null:
        <ItemsSearchBar proveedor={proveedorSeleccionado}/>
      }
      <Button onClick={submitRemito} sx={{ width: '100%', mt: '30px'}} variant="contained">SUBIR REMITO</Button>
    </>
  );
}