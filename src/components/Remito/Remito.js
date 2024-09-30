import * as React from 'react';
import './Remito.css';
import SubirRemito from './SubirRemito/SubirRemito'
import ListaPartidasRemito from './ListaPartidasRemito/ListaPartidasRemito'
import NavBar from '../NavBar/NavBar';
import SelectProveedor from './SelectProveedor/SelectProveedor';
import FechaNumeroRemito from './FechaNumeroRemito/FechaNumeroRemito';
import { Divider } from '@mui/material';
import SelectKilosPorPartida from './SelectKilosPorPartida/SelectKilosPorPartida';


export default function Remito() {

  return (
    <div>
      <NavBar titulo={ `Remito recepcion`}/>

      <SelectProveedor />
      <FechaNumeroRemito />
      
      <Divider sx={{ marginY: '20px' }} />
      
      <SelectKilosPorPartida />


{/* ------------------------------------------------------------------------------------------- */}
      <ListaPartidasRemito /> 

      <SubirRemito />
      
    </div>
  );
}