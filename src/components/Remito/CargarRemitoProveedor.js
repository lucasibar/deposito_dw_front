import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { datosBaseRemito } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import './Remito.css';

export default function CargarRemitoProveedor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [numeroRemito, setNumeroRemito] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [fecha, setFecha] = useState("");

  const confirmarNumeroProveedor = () => {
    dispatch(datosBaseRemito({ numeroRemito, proveedor, fecha }));
    navigate('/deposito_dw_front/remito'); 
  };

  return (
    <div className="formContainer">
      <CloseIcon className="closeIcon" onClick={() => navigate('/deposito_dw_front/')} />
      
      <TextField
        id="outlined-multiline-flexible"
        label="Numero de remito"
        value={numeroRemito}
        onChange={(e) => setNumeroRemito(e.target.value)}
        sx={{ width: '350px', marginTop: '10px' }}
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Nombre del proveedor"
        multiline
        value={proveedor}
        onChange={(e) =>  setProveedor(e.target.value)}
        sx={{ width: '350px', marginTop: '10px' }}
      />
      <TextField
        id="outlined-date"
        label="Fecha"
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ width: '350px', marginTop: '10px' }}  
        required
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