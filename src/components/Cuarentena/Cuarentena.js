import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { partidasEnCuarentena, partidaAprobada } from '../../redux/actions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Cuarentena() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(partidasEnCuarentena());
  }, [dispatch]);

  const partidasCuarentena = useSelector((state) => state.partidasCuarentena);

  const cambiarAstock = (partida) => {
    dispatch(partidaAprobada(partida));
  };

  return (
    <div>
    <AppBar position="static">
        <Toolbar variant="dense" className="toolbar">
          <Typography  variant="h6" color="inherit" component="div" className="left">
           Partidas en cuarentena
          </Typography>
          
          <ChevronLeftIcon onClick={()=> navigate('/deposito_dw_front/') }/>
        </Toolbar>
      </AppBar>
      <List>
        {partidasCuarentena?.map((partida, i) => (
          <div key={i}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => cambiarAstock(partida)}>
                  <CheckIcon />
                </IconButton>
              }
            >
              <ListItemText primary={`${partida.numeroPartida}`} />
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  );
}