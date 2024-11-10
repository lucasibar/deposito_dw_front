import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerMovimientosSinRemito, seleccionarPartidaSalida } from '../../../redux/actions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';

export default function ListaMovimientosRemitoSalida() {
  const dispatch = useDispatch();
  const movimientosSinRemito = useSelector((state) => state.movimientosSinRemito);
  const movimientosSalidaRemito = useSelector((state) => state.movimientosSalidaRemito);

  useEffect(() => {
    dispatch(obtenerMovimientosSinRemito());
  }, [dispatch]);

  const handleToggle = (movimiento) => {
    dispatch(seleccionarPartidaSalida(movimiento));
  };

  return (
    <List>
      {movimientosSinRemito?.map((movimiento) => {
        const isSelected = movimientosSalidaRemito.some(
          (mov) => mov.id === movimiento.id
        );

        return (
          <React.Fragment key={movimiento.id}>
            <ListItem button onClick={() => handleToggle(movimiento)}>
              <Checkbox checked={isSelected} edge="start" />
              <ListItemText
                primary={`${movimiento.item.categoria} - ${movimiento.item.descripcion}`}
                secondary={`Lote: ${movimiento.partida.numeroPartida}`}
              />
              <ListItemText primary={`${movimiento.kilos} kg`} />
              <ListItemText primary={`${movimiento.unidades} uds`} />
            </ListItem>
            <Divider />
          </React.Fragment>
        );
      })}
    </List>
  );
}
