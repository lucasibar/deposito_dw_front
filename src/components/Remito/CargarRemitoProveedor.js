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

  const handleNumeroRemitoChange = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    const formattedInput = input.slice(0, 4) + (input.length >= 4 ? '-' : '') + input.slice(4, 12);
    setNumeroRemito(formattedInput);
  };

  const confirmarNumeroProveedor = () => {
    if (/^\d{4}-\d{8}$/.test(numeroRemito)) { 
      dispatch(datosBaseRemito({ numeroRemito, proveedor, fecha }));
      navigate('/deposito_dw_front/remito');
    } else {
      alert("El número de remito debe tener el formato 4 números, un guion, y 8 números.");
    }
  };

  return (
    <div className="formContainer">
  
      <TextField
        id="outlined-multiline-flexible"
        label="Número de remito"
        value={numeroRemito}
        onChange={handleNumeroRemitoChange}
        sx={{ width: '350px', marginTop: '10px' }}
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Nombre del proveedor"
        multiline
        value={proveedor}
        onChange={(e) => setProveedor(e.target.value)}
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