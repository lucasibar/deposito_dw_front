import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

export const BarraHistorial = ({ titulo }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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