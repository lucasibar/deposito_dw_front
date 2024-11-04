import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Button, TextField, Modal, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getProveedores, seleccionarProveedor } from '../../../../redux/actions';
import NuevoProveedor from './NuevoProveedor/NuevoProveedor';

export default function RemitoSalidaForm({ item, numeroRemito, setNumeroRemito, fecha, setFecha, cliente, setCliente }) {
  const dispatch = useDispatch();

  // Obtener los proveedores al montar el componente
  useEffect(() => {
    dispatch(getProveedores());
  }, [dispatch]);

  const [proveedorSeleccionado, setProveedorSeleccionado] = useState('');
  const [mostrarNuevoProveedor, setMostrarNuevoProveedor] = useState(false);

  const proveedores = useSelector((state) =>
    state.proveedores.filter((proveedor) => proveedor.categoria === 'cliente')
  );

  // Manejar la selección de proveedor
  const handleChangeCliente = (e) => {
    const selectedProveedorId = e.target.value;
    setCliente(selectedProveedorId);
  };

  // Mostrar el modal con el formulario para crear un nuevo proveedor
  const abrirFormularioNuevoProveedor = () => {
    setMostrarNuevoProveedor(true);
  };

  // Cerrar el formulario para agregar nuevo proveedor
  const cerrarFormularioNuevoProveedor = () => {
    setMostrarNuevoProveedor(false);
  };

  return (
    <>
     <TextField
      fullWidth
      margin="normal"
      label="Número de Remito"
      type="text"
      value={numeroRemito}
      onChange={(e) => setNumeroRemito(e.target.value)}
      variant="outlined"
    />
    <TextField
      fullWidth
      margin="normal"
      label="Fecha"
      type="date"
      value={fecha}
      onChange={(e) => setFecha(e.target.value)}
      variant="outlined"
      InputLabelProps={{ shrink: true }}
    />


      <FormControl fullWidth className="form-control">
        <InputLabel id="proveedor-label">Clientes</InputLabel>
        <Select
          labelId="proveedor-label"
          id="proveedor"
          value={cliente}
          onChange={handleChangeCliente}
        >
          {proveedores?.map((prov) => (
            <MenuItem key={prov.id} value={prov}>
              {prov.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        onClick={abrirFormularioNuevoProveedor}
        className="form-control"
        style={{
          alignSelf: 'flex-start',
          fontSize: '12px',
          textTransform: 'none',
          color: 'blue',
          marginTop: '0',
        }}
      >
        Agregar nuevo cliente
      </Button>

      {/* Modal para el formulario de nuevo proveedor */}
      <Modal
        open={mostrarNuevoProveedor}
        onClose={cerrarFormularioNuevoProveedor}
        aria-labelledby="nuevo-proveedor-modal"
        aria-describedby="nuevo-proveedor-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
            minWidth: '300px',
          }}
        >
          <NuevoProveedor handleClose={cerrarFormularioNuevoProveedor} />
        </Box>
      </Modal>
    </>
  );
}
