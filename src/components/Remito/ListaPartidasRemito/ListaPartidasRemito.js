import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePartidaDelRemito } from '../../../redux/actions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Avatar, ListItemAvatar } from '@mui/material';



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
              <ListItemText primary={`${partida.item.descripcionItem|| "Sin Descripcion"}`} />
              <ListItemText primary={`Partida ${partida.kilos|| 0} `} />
              <ListItemText primary={`${partida.kilos|| 0} kilos`} />
              <ListItemText primary={`${partida.unidades|| 0} unidades`} />
            </ListItem>
          </div>
        ))}
      </List>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {partidasRemito?.map((partida, i) => (
        <>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={`${partida.item.descripcionItem|| "Sin Descripcion"}`}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: 'text.primary', display: 'inline' }}
              >
                {`Partida ${partida.kilos|| 0} `}
              </Typography>
              {`${partida.kilos|| 0} kilos`}
            </React.Fragment>
          }
        />
    <IconButton edge="end" aria-label="delete" onClick={() => deletePartida(partida)}>
                  <DeleteIcon />
                </IconButton>
      </ListItem>
      <Divider variant="inset" component="li" />
        </>
        ))}
    </List>
    </div>
  );
}