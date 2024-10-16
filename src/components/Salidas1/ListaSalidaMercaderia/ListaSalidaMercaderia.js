import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePartidaSalida } from '../../../redux/actions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ListaSalidaMercaderia() {
  const partidasRemitoSalida = useSelector((state) => state.partidasRemitoSalida);
  const dispatch = useDispatch();

  const deletePartida = (mercaderia) => {
    dispatch(deletePartidaSalida(mercaderia));
  };

  return (
    <div>
      <List>
        {partidasRemitoSalida?.map((mercaderia, i) => (
          <div key={i}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => deletePartida(mercaderia)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={`${mercaderia.partida.numeroPartida} partida`} />
              <ListItemText primary={`${mercaderia.partida.kilos} kilos`} />
              <ListItemText primary={`${mercaderia.partida.unidades} unidades`} />
              <ListItemText primary={`${mercaderia.posicion.rack} ${mercaderia.posicion.fila}${mercaderia.posicion.AB}` || `${mercaderia.posicion.pasillo}`} />
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  );
}