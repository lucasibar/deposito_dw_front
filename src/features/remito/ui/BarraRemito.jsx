import React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';

export const BarraRemito = ({ titulo }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => navigate('/deposito_dw_front/historial-salida')}
          >
            <AssignmentIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {titulo}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}; 