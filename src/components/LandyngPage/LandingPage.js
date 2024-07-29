import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataLoad } from '../../redux/actions'
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { NavLink} from 'react-router-dom';


export default function LandingPage(props) {  let dispatch = useDispatch()
  useEffect(()=>{
    dispatch(dataLoad())
  },[dispatch])
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
        <NavLink to="/deposito_dw_front/armadoPallets">  <Button variant="outlined" sx={{bgcolor:'white', width: '350px'}} >ARMADO DE PALLETS</Button>  </NavLink>
        <NavLink to="/deposito_dw_front/cuarentena">  <Button variant="outlined" sx={{bgcolor:'white', width: '350px'}} >MERCADERIA EN CUARENTENA</Button>  </NavLink>
        <NavLink to="/deposito_dw_front/stock">  <Button variant="outlined" sx={{bgcolor:'white', width: '350px'}} >STOCK</Button>  </NavLink>
        <NavLink to="/deposito_dw_front/salidas">  <Button variant="outlined" sx={{bgcolor:'white', width: '350px'}} >SALIDA DE MERCADERIA</Button>  </NavLink>
        <Button variant="outlined" sx={{bgcolor:'white', width: '350px' }}  onClick={usuarioNohabilitado}>DASHBOARD ADMINISTRADOR</Button>
    </div>
  );
}