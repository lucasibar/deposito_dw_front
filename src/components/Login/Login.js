import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField } from '@mui/material';
import styled from 'styled-components';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centra vertical y horizontalmente */
  text-align: center;
  background-color: #0073e6; /* Color de fondo azul */
  height: 100vh;
  padding: 0 20px;

  h1 {
    margin-bottom: 20px; /* Separación entre el texto y el input */
    font-size: 2em;
    font-family: 'Raleway', sans-serif; /* Fuente similar */
    font-weight: 700;
    color: white;

    @media (min-width: 768px) {
      font-size: 3em;
    }
  }
`;

export default function Login() {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleNavigate = () => {
    switch (inputValue.toUpperCase()) {
      case 'COMPRAS':
        navigate('/deposito_dw_front/remito');
        break;
      case 'CALIDAD':
        navigate('/deposito_dw_front/cuarentena');
        break;
      case 'DP':
        navigate('/deposito_dw_front/deposito-hilado');
        break;
      default:
        alert('Entrada no válida. Intente con "COMPRAS", "CALIDAD" o "DP".');
    }
  };

  const isValidInput = ['COMPRAS', 'CALIDAD', 'DP'].includes(inputValue.toUpperCase());

  const handleChange = (e) => {
    // Forzar el texto en mayúsculas al escribir
    setInputValue(e.target.value.toUpperCase());
  };

  return (
    <Box>
      <LandingContainer>
        {/* Título */}
        <h1>Der Will</h1>

        {/* Input para el nombre */}
        <TextField
          variant="outlined"
          placeholder="Ingrese un nombre"
          value={inputValue}
          onChange={handleChange}
          sx={{
            backgroundColor: 'white',
            borderRadius: 1,
            marginBottom: 2,
            width: '250px',
            textTransform: 'uppercase',
          }}
          inputProps={{
            style: { textTransform: 'uppercase' }, // Asegura que el texto se vea en mayúsculas
          }}
        />

        {/* Icono DoubleArrow que aparece cuando la entrada es válida */}
        {isValidInput && (
          <DoubleArrowIcon
            onClick={handleNavigate}
            sx={{
              fontSize: '50px', // Tamaño grande del icono
              color: 'white',
              cursor: 'pointer',
              marginTop: '20px',
              '&:hover': {
                color: '#ffcc00', // Cambia el color al pasar el mouse
              },
            }}
          />
        )}
      </LandingContainer>
    </Box>
  );
}
