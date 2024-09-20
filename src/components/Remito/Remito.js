import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { subirRemito} from '../../redux/actions'
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