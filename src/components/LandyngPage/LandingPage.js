import * as React from 'react';
import Button from '@mui/material/Button';
import './LandingPage.css';
import Swal from 'sweetalert2';
import { NavLink} from 'react-router-dom';


export default function LandingPage(props) {
    function usuarioNohabilitado(){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Usuario no habilitado",
            // footer: '<a href="#">Porque tenes este problema?</a>'
          });
    }
  return (
    <div className='landingContainer'>
        <h1>Der Will</h1>
        <NavLink to="/deposito_dw_front/remito">  <Button variant="outlined" sx={{bgcolor:'white', width: '350px'}} >SUBIR REMITO</Button>  </NavLink>
        <NavLink to="/deposito_dw_front/cuarentena">  <Button variant="outlined" sx={{bgcolor:'white', width: '350px'}} >MERCADERIA EN CUARENTENA</Button>  </NavLink>
        <Button variant="outlined" sx={{bgcolor:'white', width: '350px' }} >CONTROL DE STOCK</Button>
        <Button variant="outlined" sx={{bgcolor:'white', width: '350px' }} >SALIDA DE MERCADERIA</Button>
        <Button variant="outlined" sx={{bgcolor:'white', width: '350px' }}  onClick={usuarioNohabilitado}>DASHBOARD ADMINISTRADOR</Button>
    </div>
  );
}