import React, { useState } from 'react';
import { Modal, Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import SelectOptions from './SelectOptions/SelectOptions';
import RemitoSalidaForm from './RemitoSalidaForm/RemitoSalidaForm';
import MovimientoInternoForm from './MovimientoInternoForm/MovimientoInternoForm';
import KilosUnidadesFields from './KilosUnidadesFields/KilosUnidadesFields';
import {agregarARemitoSalida} from '../../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';


export default function ModalPopup({ posicionActualId, open, handleClose, item }) {
  const dispatch = useDispatch();
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
  const [kilos, setKilos] = useState('');
  const [unidades, setUnidades] = useState('');
  const [numeroRemito, setNumeroRemito] = useState('');
  const [fecha, setFecha] = useState('');
  const [cliente, setCliente] = useState('');
  const [rack, setRack] = useState('');
  const [fila, setFila] = useState('');
  const [ab, setAB] = useState('');

  const handleOpcionChange = (event) => {
    setOpcionSeleccionada(event.target.value);
    resetFields();
  };

  const handleKilosChange = (e) => {
    const value = e.target.value;
    if (value <= item.kilos) {
      setKilos(value);
    } else {
      alert(`No puedes exceder los ${item.kilos} Kgs disponibles`);
    }
  };

  const handleUnidadesChange = (e) => {
    const value = e.target.value;
    if (value <= item.unidades) {
      setUnidades(value);
    } else {
      alert(`No puedes exceder las ${item.unidades} unidades disponibles`);
    }
  };

  const resetFields = () => {
    setKilos('');
    setUnidades('');
    setNumeroRemito('');
    setFecha('');
    setCliente('');
    setRack('');
    setFila('');
    setAB('');
  };

  const handleGuardar = () => {
    if (opcionSeleccionada === 'Movimiento Interno') {
      console.log({ rack, fila, ab, kilos, unidades });
    } else if (opcionSeleccionada === 'Ajuste RESTA mercaderia' || opcionSeleccionada === 'Ajuste SUMA mercaderia') {
      console.log({ tipo: opcionSeleccionada, kilos, unidades });
    } else if (opcionSeleccionada === 'Agregar al remito de Salida') {
      dispatch(agregarARemitoSalida({ 
        item,
        posicionActualId,
        numeroRemito: numeroRemito,
        fecha, 
        cliente, 
        kilos: parseInt(kilos), 
        unidades: parseInt(unidades),
        tipoMovimiento: "remitoSalida" 
      }));
    }
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: '12px',
          boxShadow: 24,
          p: 4,
          minWidth: '300px',
          maxWidth: '500px',
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          {`${item.proveedor.nombre} ${item.categoria} ${item.descripcion}`}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {`Partida ${item.partida}    Kgs disponibles: ${item.kilos} | Unidades disponibles: ${item.unidades}`}
        </Typography>

        <SelectOptions
          opcionSeleccionada={opcionSeleccionada}
          handleOpcionChange={handleOpcionChange}
        />

        <KilosUnidadesFields
          item={item}
          kilos={kilos}
          handleKilosChange={handleKilosChange}
          unidades={unidades}
          handleUnidadesChange={handleUnidadesChange}
        />

        {opcionSeleccionada === 'Agregar al remito de Salida' && (
          <RemitoSalidaForm
            numeroRemito={numeroRemito}
            setNumeroRemito={setNumeroRemito}
            fecha={fecha}
            setFecha={setFecha}
            cliente={cliente}
            setCliente={setCliente}
          />
        )}

        {opcionSeleccionada === 'Movimiento Interno' && (
          <MovimientoInternoForm
            rack={rack}
            setRack={setRack}
            fila={fila}
            setFila={setFila}
            ab={ab}
            setAB={setAB}
          />
        )}

        <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGuardar}
            disabled={!opcionSeleccionada}
          >
            GENERAR MOVIMIENTO          
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
