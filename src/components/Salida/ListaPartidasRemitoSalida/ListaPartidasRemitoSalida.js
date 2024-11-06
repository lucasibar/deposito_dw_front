import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerMovimientosSinRemito } from '../../../redux/actions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';

export default function ListaPartidasRemitoSalida() {
  const dispatch = useDispatch();
  const movimientosSinRemito = useSelector((state) => state.movimientosSinRemito);
  
  // Estado local para almacenar los movimientos seleccionados por su ID
  const [movimientosSeleccionados, setMovimientosSeleccionados] = useState([]);

  useEffect(() => {
    dispatch(obtenerMovimientosSinRemito());
  }, [dispatch]);

  // Función para alternar la selección de un movimiento
  const toggleSelect = (id) => {
    setMovimientosSeleccionados((prevSeleccionados) =>
      prevSeleccionados.includes(id)
        ? prevSeleccionados.filter((itemId) => itemId !== id)
        : [...prevSeleccionados, id]
    );
  };

  return (
    <List>
      {movimientosSinRemito.map((movimiento) => (
        <div key={movimiento.id}>
          <ListItem
            onClick={() => toggleSelect(movimiento.id)}
            style={{
              backgroundColor: movimientosSeleccionados.includes(movimiento.id) ? '#e0f7fa' : 'white',
              cursor: 'pointer',
            }}
          >
            <Checkbox
              checked={movimientosSeleccionados.includes(movimiento.id)}
              onChange={() => toggleSelect(movimiento.id)}
              edge="start"
            />
            <ListItemText primary={`${movimiento.item.categoria} - ${movimiento.item.descripcion}`} />
            <ListItemText primary={`Lote: ${movimiento.partida.numeroPartida}`} />
            <ListItemText primary={`${movimiento.kilos} kg`} />
            <ListItemText primary={`${movimiento.unidades} uds`} />
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
}