import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProveedores, seleccionarProveedor, seleccionarFecha, seleccionarNumeroRemito, generarRemitoSalida } from '../../../redux/actions';
import { InputLabel, MenuItem, FormControl, Select, Button, TextField } from '@mui/material';
import Swal from 'sweetalert2';

export default function ProveedoresSearchBar() {
  const dispatch = useDispatch();
  const proveedores = useSelector((state) => state.proveedores);
  const movimientosSalidaRemito = useSelector((state) => state.movimientosSalidaRemito);

  const [proveedor, setProveedor] = useState("");
  const [numeroRemito, setNumeroRemito] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    dispatch(getProveedores());
  }, [dispatch]);

  const handleEnviarRemito = async () => {
    if (!proveedor || !numeroRemito || !fecha || movimientosSalidaRemito.length === 0) {
      Swal.fire('Faltan datos', 'Completa todos los campos y selecciona partidas.', 'warning');
      return;
    }
    const movimientosIds = movimientosSalidaRemito.map(movimiento => movimiento.id);
    const nuevoRemito = {
      proveedor,
      numeroRemito,
      fecha,
      movimientos: movimientosIds,
    };

    dispatch(generarRemitoSalida(nuevoRemito));
    // if (response.success) {
    //   Swal.fire('Éxito', 'Remito generado correctamente', 'success');
    // } else {
    //   Swal.fire('Error', 'No se pudo generar el remito', 'error');
    // }
  };

  return (
    <div>
      <FormControl>
        <InputLabel>Proveedores</InputLabel>
        <Select value={proveedor} onChange={(e) => setProveedor(e.target.value)}>
          {proveedores.map((prov, index) => (
            <MenuItem key={index} value={prov}>{prov.nombre}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField label="Número de remito" value={numeroRemito} onChange={(e) => setNumeroRemito(e.target.value)} />
      <TextField label="Fecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} InputLabelProps={{ shrink: true }} />

      <Button variant="contained" onClick={handleEnviarRemito}>Generar Remito</Button>
    </div>
  );
}
