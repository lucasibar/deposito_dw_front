import * as React from 'react';
import './Salida.css';
import NavBar from '../NavBar/NavBar';
import PosicionForm from './PosicionForm/PosicionForm';



export default function Salida(props) {


  return (
    <div>
      <NavBar titulo={"Remito de salida"}/>
        <PosicionForm />
    </div>
  );
}