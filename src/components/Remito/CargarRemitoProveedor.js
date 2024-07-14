import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { datosBaseRemito } from '../../redux/actions'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './Remito.css';

export default function CargarRemitoProveedor({ confirmar }) {
  const dispatch = useDispatch();
  const [numeroRemito, setNumeroRemito] = useState(0);
  const [proveedor, setProveedor] = useState("");

  const handleNumeroRemito = (e) => {
    setNumeroRemito(parseInt(e.target.value, 10));
  };

  const handleProveedor = (e) => {
    setProveedor(e.target.value);
  };

  const confirmarNumeroProveedor = () => {
    dispatch(datosBaseRemito({ numeroRemito, proveedor }));
    confirmar(numeroRemito, proveedor);
  };

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
      <Button
        onClick={confirmarNumeroProveedor}
        sx={{ width: '350px', mt: '30px' }}
        variant="contained"
      >
        CONFIRMAR nº REMITO/PROVEEDOR
      </Button>
    </div>
  );
}