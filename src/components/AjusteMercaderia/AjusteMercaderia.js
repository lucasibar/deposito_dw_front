import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { agragarPartidaAlRemito, dataRemitoLoad, generarNuevoProveedor, subirRemito } from '../../../redux/actions';
import { InputLabel, MenuItem, FormControl, Select, Button, TextField, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './FormRemito.css'; // Importamos la hoja de estilos
import Swal from 'sweetalert2';

export default function AjusteMercaderia() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const partidasRemito = useSelector((state) => state.partidasRemito);

  // PROVEEDOR
  const proveedores = useSelector((state) => state.proveedores);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(""); 
  const handleChangeProveedor = (e) => {
    setProveedorSeleccionado(e.target.value);
  };
  const [numeroRemito, setNumeroRemito] = useState("");
  const [fecha, setFecha] = useState("");
  
  const handleNumeroRemitoChange = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    const formattedInput = input.slice(0, 4) + (input.length >= 4 ? '-' : '') + input.slice(4, 12);
    setNumeroRemito(formattedInput);
  };
  
  // ITEM
  const items = useSelector((state) => state.items);
  const [itemSeleccionado, setItemSeleccionado] = useState(""); 
  const handleChangeItem = (e) => {
    setItemSeleccionado(e.target.value);
  };
  
  const [partida, setPartida] = useState({
    kilos: "",
    numeroPartida: "",
    unidades: "",
  });
  
  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
      // Solo permitir números válidos
    const isNumeric = /^[0-9]*$/.test(value);
      if (isNumeric || value === "") {
      setPartida({
        ...partida,
        [field]: value === "" ? "" : parseInt(value, 10)
      });
    }
  };
  
  const limpiar = () => {
    setPartida({ kilos: "", numeroPartida: "", unidades: "" });
  };
  
  const subirPartida = () => {
    partida.descripcionItem = itemSeleccionado;
    dispatch(agragarPartidaAlRemito(partida));
  };
  
  const crearNuevoProveedor = () => {
    Swal.fire({
      title: "Nombre del nuevo proveedor",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Cargar proveedor",
      showLoaderOnConfirm: true,
      preConfirm: async (nombreProveedor) => {
        try {
          dispatch(generarNuevoProveedor(nombreProveedor))
        } catch (error) {
          Swal.showValidationMessage(`
            Request failed: ${error}
            `);
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      })
    };
    
    
    useEffect(() => {
      dispatch(dataRemitoLoad());
    }, [dispatch, proveedores]);
    



    async function submitRemito(){
  
      let datosRemito= {
        proveedor: proveedorSeleccionado,
        numeroRemito: numeroRemito,
        fechaRemito: fecha
      }
      dispatch(subirRemito({tipoMovimiento:"ajuste", partidasRemito, datosRemito}))
    navigate('/deposito_dw_front/');
  }


    return (
      <>
      {/* Contenedor para Proveedor, Número de remito y Fecha */}
      <div className="remito-form-container">
        <FormControl className="form-control">
          <InputLabel id="proveedor-label">Proveedores</InputLabel>
          <Select
            labelId="proveedor-label"
            id="proveedor"
            value={proveedorSeleccionado}
            onChange={handleChangeProveedor}
          >
            {proveedores?.map((prov, i) => (
              <MenuItem key={i} value={prov}>{prov}</MenuItem>
            ))}
            <Button onClick={crearNuevoProveedor} style={{ color: "blue" }}>
              Agregar proveedor nuevo
            </Button>
          </Select>
        </FormControl>

        <TextField
          className="form-control"
          id="numero-remito"
          label="Número de remito"
          value={numeroRemito}
          onChange={handleNumeroRemitoChange}
        />

        <TextField
          className="form-control"
          id="fecha"
          label="Fecha"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </div>
      <Divider sx={{ marginY: '20px' }} />

      {/* Campo de Descripción de Item en una fila aparte */}

      <div className="remito-form-container">
      <FormControl className="descripcion-item">
        <InputLabel id="item-label">Descripción Item</InputLabel>
        <Select
          labelId="item-label"
          id="item"
          value={itemSeleccionado}
          onChange={handleChangeItem}
        >
          {items?.map((itm, i) => (
            <MenuItem key={i} value={itm}>{itm}</MenuItem>
          ))}
          <Button onClick={() => navigate('/deposito_dw_front/nuevoitem')} style={{ color: "blue" }}>
            Agregar item nuevo
          </Button>
        </Select>
      </FormControl>
      </div>
      {/* Contenedor para Número de Partida, Kilos y Unidades */}
      <div className="partida-form-container">
        <TextField
          className="form-control"
          id="numero-partida"
          label="Número de partida"
          value={partida.numeroPartida}
          onChange={handleInputChange('numeroPartida')}
        />

        <TextField
          className="form-control"
          id="kilos"
          label="Kilos de partida"
          value={partida.kilos}
          onChange={handleInputChange('kilos')}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*'
          }}
        />

        <TextField
          className="form-control"
          id="unidades"
          label="Unidades"
          value={partida.unidades}
          onChange={handleInputChange('unidades')}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*'
          }}
        />
      </div>

      {/* Contenedor de los botones centrados */}
      <div className="button-container">
        <Button onClick={subirPartida} sx={{ width: '350px', mt: '30px'}} variant="outlined">AGREGAR PARTIDA</Button>
        <Button onClick={limpiar} sx={{ width: '350px', mt: '30px'}} variant="outlined">LIMPIAR</Button>
        <Button onClick={submitRemito} sx={{ width: '350px', mt: '30px'}} variant="contained">SUBIR REMITO</Button>

      </div>


    </>
  );
}