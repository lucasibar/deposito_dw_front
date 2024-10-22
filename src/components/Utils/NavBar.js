import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { limpiarProveedorSeleccionado} from '../../redux/actions'

export default function NavBar({ titulo, subtitulo }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  function volverHome() {
    navigate(-1);
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense" className="toolbar">
          <Typography variant="h6" color="inherit" component="div" className="left">
            {titulo}
          </Typography>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            {subtitulo?
            <Typography variant="h6" color="inherit" component="div" sx={{ marginRight: '16px' }}>
              {subtitulo}
            </Typography>:
            null       
            }

            <ChevronLeftIcon onClick={volverHome} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}