import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/deposito_dw_front/stock');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: 2
      }}
    >
      <Typography variant="h4">Der Will</Typography>
      <Button 
        variant="outlined" 
        onClick={handleLogin}
        sx={{ 
          width: 200,
          color: '#2e7d32',
          borderColor: '#2e7d32',
          '&:hover': {
            backgroundColor: '#2e7d32',
            color: 'white',
            borderColor: '#2e7d32'
          }
        }}
      >
        Ingresar
      </Button>
    </Box>
  );
}; 