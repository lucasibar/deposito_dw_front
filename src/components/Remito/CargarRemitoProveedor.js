import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { datosBaseRemito } from '../../redux/actions'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './Remito.css';
import CloseIcon from '@mui/icons-material/Close';

export default function CargarRemitoProveedor() {
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const [numeroRemito, setNumeroRemito] = useState(0);
  const [proveedor, setProveedor] = useState("");
  const [fecha, setFecha] = useState("");
  
  const handleNumeroRemito = (e) => {
    setNumeroRemito(parseInt(e.target.value, 10));
  };
  
  const handleProveedor = (e) => {
    setProveedor(e.target.value);
  };

  const handleFecha = (e) => {
    setFecha(e.target.value);
  };
  
  const confirmarNumeroProveedor = () => {
    dispatch(datosBaseRemito({ numeroRemito, proveedor, fecha }));
    navigate('/deposito_dw_front/remito'); 
  };
  
  return (
    <div>
      <CloseIcon  onClick={()=>  navigate('/deposito_dw_front/') }/>
      <TextField
        id="outlined-multiline-flexible"
        label="Numero de remito"
        multiline
        value={numeroRemito}
        onChange={handleNumeroRemito}
        // maxRows={4}
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Nombre del proveedor"
        multiline
        value={proveedor}
        onChange={handleProveedor}
        // maxRows={4}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Fecha"
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        InputLabelProps={{ shrink: true }}
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