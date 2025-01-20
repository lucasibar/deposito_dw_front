import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  dataProveedoresItems,
  seleccionarProveedor,
  seleccionarFecha,
  seleccionarNumeroRemito,
  agragarPartidaAlRemito,
  subirRemitoBDD,
  generarNuevoProveedor
} from '../../../redux/actions';
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Autocomplete,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function FormRemito() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Estados globales
  const proveedores = useSelector((state) => state.proveedores);
  const itemsRedux = useSelector((state) => state.items); // Cambia "itemsProveedor" a "items" basado en las imágenes de tu estado
  const partidasRemitoRedux = useSelector((state) => state.partidasRemito); // Cambia "itemsProveedor" a "items" basado en las imágenes de tu estado

  // Estados locales
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState("");
  const [numeroRemito, setNumeroRemito] = useState("");
  const [fecha, setFecha] = useState("");
  const [itemsFiltrados, setItemsFiltrados] = useState([]);
  const [itemSeleccionado, setItemSeleccionado] = useState(null);
  const [partida, setPartida] = useState({ kilos: "", numeroPartida: "", unidades: "" });

  // Efectos para cargar datos
  useEffect(() => {
    dispatch(dataProveedoresItems()); // Carga de proveedores e ítems
  }, [dispatch]);

  // Filtrar los ítems según el proveedor seleccionado
  useEffect(() => {
    if (proveedorSeleccionado) {
      const proveedor = proveedores.find((p) => p.nombre === proveedorSeleccionado.nombre);
      if (proveedor) {
        const itemsDelProveedor = itemsRedux.filter(
          (item) => item.proveedor && item.proveedor.id === proveedor.id
        );
        setItemsFiltrados(itemsDelProveedor);
      }
    } else {
      setItemsFiltrados([]);
    }
  }, [proveedorSeleccionado, itemsRedux, proveedores]);

  // Handlers
  const handleChangeProveedor = (e) => {
    setProveedorSeleccionado(e.target.value);
    dispatch(seleccionarProveedor(e.target.value));
  };

  const handleNumeroRemitoChange = (e) => {
    const value = e.target.value;
    setNumeroRemito(value);
    // dispatch(seleccionarNumeroRemito(value));
  };

  const handleFechaChange = (e) => {
    const value = e.target.value;
    setFecha(value);
    // dispatch(seleccionarFecha(value));
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    if (field === "kilos" || field === "unidades") {
      // Para kilos y unidades, mantener la validación numérica
      if (/^\d*$/.test(value)) {
        setPartida((prev) => ({ ...prev, [field]: value }));
      }
    } else if (field === "numeroPartida") {
      // Para numeroPartida, asegurarnos que se guarde como string
      setPartida((prev) => ({ ...prev, [field]: value.toString() }));
    } else {
      setPartida((prev) => ({ ...prev, [field]: value }));
    }
  };

  const agregarPartida = () => {
    if (itemSeleccionado) {
      const nuevaPartida = { 
        ...partida, 
        numeroPartida: partida.numeroPartida.toString(), // Asegurar que sea string
        item: itemSeleccionado 
      };
      dispatch(agragarPartidaAlRemito(nuevaPartida));
      setPartida({ kilos: "", numeroPartida: "", unidades: "" });
      setItemSeleccionado(null);
    }
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
          dispatch(generarNuevoProveedor({nombre: nombreProveedor, categoria:"proveedor"}))
        } catch (error) {
          Swal.showValidationMessage(`
            Request failed: ${error}
            `);
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      })
    };


  const subirRemito = () => {
    if (proveedorSeleccionado && numeroRemito && fecha) {
      const remito = {
        proveedorSeleccionado: proveedorSeleccionado.nombre,
        fechaSeleccionado: fecha,
        numeroRemitoSeleccionado: numeroRemito,
        partidasRemito: partidasRemitoRedux,
        tipoMovimiento: "remitoEntrada",
      };
      dispatch(subirRemitoBDD(remito));
      navigate("/deposito_dw_front/remito");
    } else {
      Swal.fire("Error", "Completa todos los campos obligatorios.", "error");
    }
  };

  // Render
  return (
    <Box sx={{ padding: "20px" }}>
      {/* Proveedor, número de remito y fecha */}
      <div>
        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <InputLabel>Proveedor</InputLabel>
          <Select value={proveedorSeleccionado} onChange={handleChangeProveedor}>
            <Button onClick={crearNuevoProveedor} style={{ color: "blue" }}>
              NUEVO PROVEEDOR
            </Button>
            {proveedores.map((prov) => (
              <MenuItem key={prov.id} value={prov}>
                {prov.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Número de remito"
          value={numeroRemito}
          onChange={handleNumeroRemitoChange}
          sx={{ marginBottom: "20px" }}
        />

        <TextField
          fullWidth
          label="Fecha"
          type="date"
          value={fecha}
          onChange={handleFechaChange}
          InputLabelProps={{ shrink: true }}
          sx={{ marginBottom: "20px" }}
        />
      </div>

      <Divider sx={{ marginY: "20px" }} />

      {/* Selección de ítems y datos de la partida */}
      <div>
      <Autocomplete
  options={proveedorSeleccionado ? [...itemsFiltrados, { id: "nuevo-item", descripcion: "NUEVO ITEM", especial: true }] : []}
  getOptionLabel={(option) =>
    option.especial ? option.descripcion : `${option.categoria} ${option.descripcion}`
  }
  value={itemSeleccionado}
  onChange={(event, newValue) => {
    if (newValue?.especial) {
      navigate('/deposito_dw_front/nuevoitem');
    } else {
      setItemSeleccionado(newValue);
    }
  }}
  renderOption={(props, option) => (
    <li
      {...props}
      style={{ color: option.especial ? "blue" : "inherit", fontWeight: option.especial ? "bold" : "normal" }}
    >
      {option.especial ? option.descripcion : `${option.categoria} ${option.descripcion}`}
    </li>
  )}
  renderInput={(params) => <TextField {...params} label="Seleccionar ítem" />}
  disabled={!proveedorSeleccionado} // Deshabilita si no hay proveedor seleccionado
  sx={{ marginBottom: "20px" }}
/>

        <TextField
          fullWidth
          label="Número de partida"
          value={partida.numeroPartida}
          onChange={handleInputChange("numeroPartida")}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          fullWidth
          label="Kilos"
          value={partida.kilos}
          onChange={handleInputChange("kilos")}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          fullWidth
          label="Unidades"
          value={partida.unidades}
          onChange={handleInputChange("unidades")}
          sx={{ marginBottom: "20px" }}
        />
      </div>

      <Divider sx={{ marginY: "20px" }} />

      {/* Botones */}
      <div>
        <Button variant="outlined" fullWidth sx={{ marginBottom: "10px" }} onClick={agregarPartida}>
          Agregar partida
        </Button>
        <Button variant="contained" fullWidth onClick={subirRemito}>
          Subir remito
        </Button>
      </div>
    </Box>
  );
}
