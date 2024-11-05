import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerMovimientosSinRemito } from '../../../redux/actions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

export default function ListaPartidasRemitoSalida() {
  const dispatch = useDispatch();
  const movimientosSinRemito = useSelector((state) => state.movimientosSinRemito);
  const [movimientosSeleccionados, setMovimientosSeleccionados] = useState([]);

  useEffect(() => {
    dispatch(obtenerMovimientosSinRemito());
  }, [dispatch]);

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
        <ListItem
          key={movimiento.id}
          onClick={() => toggleSelect(movimiento.id)}
          style={{
            backgroundColor: movimientosSeleccionados.includes(movimiento.id) ? '#e0f7fa' : 'white',
          }}
        >
          <Checkbox
            checked={movimientosSeleccionados.includes(movimiento.id)}
            onChange={() => toggleSelect(movimiento.id)}
            edge="start"
          />
          <ListItemText primary={`${movimiento.item.categoria} - ${movimiento.item.descripcion}`} />
          <ListItemText primary={`LOTE: ${movimiento.partida.lote}`} />
          <ListItemText primary={`${movimiento.kilos} kg`} />
          <ListItemText primary={`${movimiento.unidades} uds`} />
        </ListItem>
      ))}
    </List>
  );
}
