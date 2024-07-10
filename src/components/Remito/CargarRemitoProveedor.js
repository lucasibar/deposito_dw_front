import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { datosBaseRemito } from '../../redux/actions'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './Remito.css';


export default function CargarRemitoProveedor({confirmar}) {
  let dispatch = useDispatch()  
  const [numeroRemito, setNumeroRemito] = useState(null);
  const [proveedor, setProveedor] = useState("proveedor");

  const handleNumeroRemito = (e) => {
    setNumeroRemito(e.target.value);
  }
  const handleProveedor = (e) => {
    setProveedor(e.target.value);
  }
function confirmarNumeroProveedor(){
dispatch(datosBaseRemito(numeroRemito, proveedor))
confirmar(numeroRemito, proveedor)
}

  return (
    <div>

        <TextField
            id="outlined-multiline-flexible"
            label="NUMERO REMITO"
            multiline
            value={numeroRemito}
            onChange={handleNumeroRemito}
            // maxRows={4}
        />
        <TextField
            id="outlined-multiline-flexible"
            label="PROVEEDOR"
            multiline
            value={proveedor}
            onChange={handleProveedor}
            // maxRows={4}
        />
      <Button onClick={confirmarNumeroProveedor} sx={{ width: '350px', mt: '30px'}} variant="contained">CONFIRMAR nº REMITO/PROVEEDOR</Button>
        


    </div>
  );
}