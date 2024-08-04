import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';

export default function NavBar({ titulo }) {
  const navigate = useNavigate();

  function volverHome() {
    navigate('/deposito_dw_front/');
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense" className="toolbar">
          <Typography variant="h6" color="inherit" component="div" className="left">
            {titulo}
          </Typography>
          <ChevronLeftIcon onClick={volverHome} style={{ cursor: 'pointer' }} />
        </Toolbar>
      </AppBar>
    </div>
  );
}