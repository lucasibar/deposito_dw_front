import * as React from 'react';
import './Remito.css';
import FormRemito from './FormRemito/FormRemito'
import ListaPartidasRemito from './ListaPartidasRemito/ListaPartidasRemito'
import NavBar from '../NavBar/NavBar';


export default function Remito(props) {


  return (
    <div>
      <NavBar titulo={ `Remito recepcion`}/>
        
      <FormRemito />
      
      <ListaPartidasRemito /> 
      
    </div>
  );
}