import * as React from 'react';
import FormRemito from './FormRemito/FormRemito'
import ListaPartidasRemitoSalida from './ListaPartidasRemitoSalida/ListaPartidasRemitoSalida'
import NavBar from '../Utils/NavBar';


export default function Salida(props) {
  
  return (
    <div>
      <NavBar titulo={ `Remito salida`}/>
      <FormRemito />
      <ListaPartidasRemitoSalida /> 
      
    </div>
  );
}