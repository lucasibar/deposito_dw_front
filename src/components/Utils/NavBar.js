import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';


const rutas = [
  { nombre: 'Home', path: '/deposito_dw_front/' },
  { nombre: 'Remito entrada', path: '/deposito_dw_front/remito' },
  { nombre: 'Cuarentena', path: '/deposito_dw_front/cuarentena' },
  { nombre: 'Remito salida', path: '/deposito_dw_front/salidas' },
  { nombre: 'Informe salidas', path: '/deposito_dw_front/historial-salida' },
  { nombre: 'Agenda', path: '/deposito_dw_front/agenda' },

];

export default function NavBar({ titulo }) {
  const navigate = useNavigate();

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const volverHome = () => {
    navigate(-1);
  };

  // Navegar a la ruta seleccionada
  const handleNavigate = (path) => {
    navigate(path);
    handleClose(); // Cerrar el menú al hacer click
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={volverHome}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {titulo}
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {/* Iteramos sobre las rutas para crear los enlaces */}
                {rutas.map((ruta) => (
                  <MenuItem
                    key={ruta.path}
                    onClick={() => handleNavigate(ruta.path)}
                    sx={{ fontWeight: 300 }} // Aquí ajustamos el grosor de la fuente
                  >
                    {ruta.nombre}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
