import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button} from '@mui/material';
import { Navigate } from 'react-router-dom';


export default function SubirRemito() {
 
    async function submitRemito(){
  
      // let datosRemito= {
      //   proveedor: proveedorSeleccionado,
      //   numeroRemito: numeroRemito,
      //   fechaRemito: fecha
      // }
      // dispatch(subirRemito({tipoMovimiento:"remito", partidasRemito, datosRemito}))
    Navigate(-1);
  }


    return (
           <Button onClick={submitRemito} sx={{ width: '350px', mt: '30px'}} variant="contained">SUBIR REMITO</Button>
    );
}