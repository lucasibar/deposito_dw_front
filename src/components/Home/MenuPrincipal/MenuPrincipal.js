import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Estilo personalizado para el tooltip (sin alterar los íconos ni la funcionalidad)
const CustomTooltip = styled('div')({
  whiteSpace: 'nowrap',     // Mantener texto en una sola línea
  maxWidth: 'none',         // Eliminar límite de ancho
//   backgroundColor: 'rgba(0, 0, 0, 0.87)', // Fondo oscuro
  fontSize: '14px',         // Tamaño de la fuente
//   color: 'white',           // Texto blanco
//   padding: '8px 12px',      // Relleno del tooltip
});

const actions = [
  { icon: <FileCopyIcon />, name: 'Remito entrada', ruta: "/deposito_dw_front/remito" },
  { icon: <PrintIcon />, name: 'Cuarentena', ruta: "/deposito_dw_front/cuarentena" },
  { icon: <SaveIcon />, name: 'Remito salida', ruta: "/deposito_dw_front/salidas" },
  { icon: <ShareIcon />, name: 'Informe salidas', ruta: "/deposito_dw_front/historial-salida" },
  { icon: <ShareIcon />, name: 'Agenda', ruta: "/deposito_dw_front/agenda" },
  { icon: <ShareIcon />, name: 'Qr', ruta: "/deposito_dw_front/qr" },
];

export default function MenuPrincipal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'fixed', bottom: 30, right: 30 }} // Posición fija
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon} // Ícono que se muestra
            tooltipTitle={<CustomTooltip>{action.name}</CustomTooltip>} // Tooltip personalizado
            tooltipOpen
            onClick={handleClose}
            FabProps={{
              component: NavLink, // Usamos NavLink como componente en FabProps
              to: action.ruta,    // Ruta para NavLink
              className: "navButton", // Clase para NavLink
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}