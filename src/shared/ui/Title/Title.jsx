import React, { useState } from 'react';
import { 
  IconButton, 
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import WarningIcon from '@mui/icons-material/Warning';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import LabelIcon from '@mui/icons-material/Label';
import InventoryIcon from '@mui/icons-material/Inventory';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useNavigate } from 'react-router-dom';
import styles from './Title.module.css';

const rutas = [
  //{ nombre: 'Home', path: '/deposito_dw_front/', icon: <HomeIcon /> },
  { nombre: 'Remito entrada', path: '/deposito_dw_front/remito-entrada', icon: <ReceiptIcon /> },
  { nombre: 'Cuarentena', path: '/deposito_dw_front/calidad', icon: <WarningIcon /> },
  { nombre: 'Stock', path: '/deposito_dw_front/stock', icon: <AssessmentIcon /> },
  { nombre: 'Informe consumos', path: '/deposito_dw_front/consumos', icon: <AssessmentIcon /> },
  { nombre: 'Producción Diaria', path: '/deposito_dw_front/produccion-diaria', icon: <ProductionQuantityLimitsIcon /> },
  { nombre: 'Orden de pedido', path: '/deposito_dw_front/orden-pedido', icon: <LocalShippingIcon /> },
  { nombre: 'Artículos', path: '/deposito_dw_front/articulos', icon: <InventoryIcon /> },
  { nombre: 'Plan de Producción', path: '/deposito_dw_front/plan-produccion', icon: <CalendarMonthIcon /> },
  { nombre: 'Match Lote/PO', path: '/deposito_dw_front/match-lote-po', icon: <CompareArrowsIcon /> },
  { nombre: 'Match Lote/Stock', path: '/deposito_dw_front/match-lote-stock', icon: <CompareArrowsIcon /> },
];

const SideMenu = ({ open, onClose, onNavigate }) => {
  return (
    <Box sx={{ 
      width: { xs: '100vw', sm: 300 }, 
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
      }}>


      <Box sx={{ 
      p: 2, 
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      }}>
        <Avatar sx={{ 
        width: 40, 
        height: 40,
        bgcolor: '#2ecc71'
        }}>U</Avatar>

        <Typography>Usuario</Typography>
      </Box>

      
        <IconButton onClick={onClose} sx={{ color: '#2ecc71' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ flexGrow: 1 }}>
        {rutas.map((ruta) => (
          <ListItem 
            button 
            key={ruta.path} 
            onClick={() => !ruta.disabled && onNavigate(ruta.path)}
            sx={{ 
              py: 2,
              '&:hover': {
                backgroundColor: ruta.disabled ? 'transparent' : 'rgba(46, 204, 113, 0.08)'
              },
              opacity: ruta.disabled ? 0.5 : 1,
              cursor: ruta.disabled ? 'not-allowed' : 'pointer'
            }}
          >
            <ListItemIcon sx={{ color: ruta.disabled ? 'rgba(0, 0, 0, 0.38)' : '#2ecc71' }}>{ruta.icon}</ListItemIcon>
            <ListItemText 
              primary={ruta.nombre}
              sx={{
                '& .MuiListItemText-primary': {
                  fontWeight: 500,
                  color: ruta.disabled ? 'rgba(0, 0, 0, 0.38)' : 'inherit'
                }
              }}
            />
          </ListItem>
        ))}
      </List>

    </Box>
  );
};

export const Title = ({ children }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <div className={styles.mainContainer}>
      <header className={styles.header}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{children}</h1>
          <IconButton
            aria-label="more"
            onClick={() => setMenuOpen(true)}
            className={styles.menuButton}
          >
            <MoreVertIcon />
          </IconButton>
        </div>
      </header>
      
      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        variant="temporary"
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 300 },
            backgroundColor: 'white'
          }
        }}
      >
        <SideMenu 
          open={menuOpen} 
          onClose={() => setMenuOpen(false)} 
          onNavigate={handleNavigate}
        />
      </Drawer>
    </div>
  );
}; 