import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePartidaDelRemito } from '../../../redux/actions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ListaPartidasRemito() {
  const partidasRemito = useSelector((state) => state.partidasRemito);
  const dispatch = useDispatch();

  const deletePartida = (numeroPartida) => {
    dispatch(deletePartidaDelRemito(numeroPartida.numeroPartida));
  };

  return (
    <div>
      <List>
        {partidasRemito?.map((partida, i) => (
          <div key={i}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => deletePartida(partida)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={`${partida.descripcionItem}`} />
              <ListItemText primary={`${partida.kilos} kilos`} />
              <ListItemText primary={`${partida.unidades} unidades`} />
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  );
}