import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { limpiarProveedorSeleccionado} from '../../redux/actions'

export default function NavBarPrincipal({ titulo }) {
 

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense" className="toolbar">
          <Typography variant="h6" color="inherit" component="div" className="left">
            {titulo}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}