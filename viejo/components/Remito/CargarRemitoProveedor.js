import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { datosBaseRemito, loadProveedores, agregarNuevoProveedor } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import './Remito.css';
import { useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Swal from 'sweetalert2';

export default function CargarRemitoProveedor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loadProveedores());
  }, [dispatch]);

  
  const [numeroRemito, setNumeroRemito] = useState("");
  const [categoriaMercaderiaRemito, setCategoriaMercaderiaRemito] = useState("");
  const [fecha, setFecha] = useState("");

  const handleNumeroRemitoChange = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    const formattedInput = input.slice(0, 4) + (input.length >= 4 ? '-' : '') + input.slice(4, 12);
    setNumeroRemito(formattedInput);
  };

  
  
  
  
  const proveedores = useSelector((state) => state.proveedores);
  const [proveedorSeleccionado, setProveedorSeleccionado] =useState(""); 
  const [nombreProveedores, setNombreProveedores] = useState([]); 
  useEffect(() => {
    if (proveedores.length > 0) {
      // const nombreProveedores = proveedores.map((proveedor) => proveedor.categoria === "proveedor" ? proveedor.nombre: null);
      const nombreProveedores = proveedores.map((proveedor) => proveedor.nombre);
      setNombreProveedores(nombreProveedores);
    }
  }, [proveedores, setNombreProveedores]);
  
  const handleChange = (e) => {
    const nombreProveedorSeleccionado = e.target.value;
    setProveedorSeleccionado(nombreProveedorSeleccionado);
  };
  const addNuevoProveedor = (e) => {
    Swal.fire({
      title: "Generar nuevo proveedor",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Generar",
      showLoaderOnConfirm: true,
      preConfirm: async (login) => {
        dispatch(agregarNuevoProveedor(login))
        return login
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  };
  









  const confirmarNumeroProveedor = () => {
    if (/^\d{4}-\d{8}$/.test(numeroRemito)) { 
      dispatch(datosBaseRemito({ numeroRemito, proveedorSeleccionado, fecha, categoriaMercaderiaRemito }));
      navigate('/deposito_dw_front/remito');
    } else {
      alert("El número de remito debe tener el formato 4 números, un guion, y 8 números.");
    }
  };



  return (
    <div className="formContainer">
      <CloseIcon className="closeIcon" onClick={() => navigate('/deposito_dw_front/')} />
      
      <TextField
        id="outlined-multiline-flexible"
        label="Número de remito"
        value={numeroRemito}
        onChange={handleNumeroRemitoChange}
        sx={{ width: '350px', marginTop: '10px' }}
        />
      
      
      <FormControl sx={{ width: '350px', marginTop: '10px' }}>
      <InputLabel id="demo-simple-select-label">Proveedor</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={proveedorSeleccionado}
          onChange={handleChange}
        >
          {nombreProveedores?.map((itm, i) => (
            <MenuItem key={i} value={itm}>{itm}</MenuItem>
          ))}
          <MenuItem value="" onClick={addNuevoProveedor} style={{ color: "blue" }}>
            Agregar nuevo proveedor
          </MenuItem>
        </Select>
      </FormControl>
{/* 
      <FormControl sx={{ width: '350px', marginTop: '10px' }}>
      <InputLabel id="demo-simple-select-label">Categoria mercaderia</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoriaMercaderiaRemito}
          onChange={(e) => setCategoriaMercaderiaRemito(e.target.value)}
        >
          <MenuItem key={1} value={"local"}>Produccion local</MenuItem>
          <MenuItem key={2} value={"temporal"}>Produccion temporal</MenuItem>
        </Select>
      </FormControl>
       */}
      
      
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