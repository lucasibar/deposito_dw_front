import * as React from 'react';
import FormRemito from './FormRemito/FormRemito'
import ListaPartidasRemito from './ListaPartidasRemito/ListaPartidasRemito'
import NavBar from '../NavBar/NavBar';


export default function Salida(props) {
  
  return (
    <div>
      <NavBar titulo={ `Remito salida`}/>
      <FormRemito />
      <ListaPartidasRemito /> 
      
    </div>
  );
}