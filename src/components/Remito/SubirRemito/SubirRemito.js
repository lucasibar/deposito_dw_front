import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button} from '@mui/material';


export default function SubirRemito() {
 
    async function submitRemito(){
  
      // let datosRemito= {
      //   proveedor: proveedorSeleccionado,
      //   numeroRemito: numeroRemito,
      //   fechaRemito: fecha
      // }
      // dispatch(subirRemito({tipoMovimiento:"remito", partidasRemito, datosRemito}))
    navigate('/deposito_dw_front/');
  }


    return (
           <Button onClick={submitRemito} sx={{ width: '350px', mt: '30px'}} variant="contained">SUBIR REMITO</Button>
    );
}