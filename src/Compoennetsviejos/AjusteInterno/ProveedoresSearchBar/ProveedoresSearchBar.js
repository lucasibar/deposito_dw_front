import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProveedores, seleccionarProveedor } from '../../../../../redux/actions';
import { InputLabel, MenuItem, FormControl, Select, Button, Modal, Box } from '@mui/material';
import NuevoProveedor from './NuevoProveedor'; // Importar el nuevo componente
import './ProveedoresSearchBar.css';

export default function ProveedoresSearchBar() {
  const dispatch = useDispatch();

  // Obtener los proveedores al montar el componente
  useEffect(() => {
    dispatch(getProveedores());
  }, [dispatch]);

  // Estado para proveedores y proveedor seleccionado
  const [proveedores, setProveedores] = useState([]);
  const proveedoresRedux = useSelector((state) =>
    state.proveedores.filter((proveedor) => proveedor.categoria === 'cliente')
  );

  // Actualizar estado de proveedores cuando cambie el Redux
  useEffect(() => {
    setProveedores(proveedoresRedux);
  }, [proveedoresRedux]);

  const [proveedorSeleccionado, setProveedorSeleccionado] = useState('');
  const [mostrarNuevoProveedor, setMostrarNuevoProveedor] = useState(false); // Estado para mostrar el formulario

  // Manejar la selección de proveedor
  const handleChangeProveedor = (e) => {
    const selectedProveedorId = e.target.value;
    dispatch(seleccionarProveedor(selectedProveedorId));
    setProveedorSeleccionado(selectedProveedorId);
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
      <FormControl fullWidth className="form-control">
        <InputLabel id="proveedor-label">Proveedores</InputLabel>
        <Select
          labelId="proveedor-label"
          id="proveedor"
          value={proveedorSeleccionado}
          onChange={handleChangeProveedor}
        >
          {proveedores?.map((prov) => (
            <MenuItem key={prov.id} value={prov.id}>
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
