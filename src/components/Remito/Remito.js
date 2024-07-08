import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataLoad, agragarCajaCuarentena } from '../../redux/actions'
import {  useNavigate } from 'react-router-dom';

import EntradaCaja from './EntradaCaja/EntradaCaja'
import ListaCajasRemito from './ListaCajasRemito/ListaCajasRemito'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import './Remito.css';


export default function Remito(props) {
  const [remito, setRemito] = useState(null);
  const [proveedor, setProveedor] = useState("Rontaltex");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dataLoad())
  }, []);


  const items = useSelector((state) => state.items);
  const [itemsDescripciones, setIiemsDescripciones] = useState([]); 
  useEffect(() => {
    if (items.length > 0) {
      const descripcionItems = items.map((item) => item.descripcion);
      setIiemsDescripciones(descripcionItems);
    }
  }, [items, setIiemsDescripciones]);

const navigate = useNavigate();
function submitRemito(){
  dispatch(agragarCajaCuarentena())
  navigate('/deposito_dw_front');

}

  return (
    <div>

    
      <AppBar position="static">
        <Toolbar variant="dense" className="toolbar">
          <Typography variant="h6" color="inherit" component="div" className="left">
            Remito {remito ? `${remito}` : "00000"}
          </Typography>
          <Typography variant="h6" color="inherit" component="div" className="right">
            {proveedor}
          </Typography>
        </Toolbar>
      </AppBar>


      <EntradaCaja items={items} itemsDescripciones={itemsDescripciones}/>
      <Button onClick={submitRemito} sx={{ width: 400, mt: '30px'}} variant="contained">SUBIR REMITO</Button>
      

      <ListaCajasRemito items={items}/> 
        


    </div>
  );
}