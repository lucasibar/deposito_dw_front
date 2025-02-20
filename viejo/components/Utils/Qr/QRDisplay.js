import React from 'react';
import qrImage from '../imagenes/qr-code.png'; // Asegúrate de poner el nombre correcto
import styled from 'styled-components';

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column; /* Cambia a columna para apilar elementos */
  align-items: center;
  justify-content: center;  /* Centra vertical y horizontalmente */
  text-align: center;
  background-color: #0073e6; /* Color de fondo azul similar */
  height: 100vh;
  padding: 0 20px;

  h1 {
    margin-bottom: 20px;  /* Separación entre el texto y el QR */
    font-size: 2em;
    font-family: 'Raleway', sans-serif; /* Fuente similar */
    font-weight: 700;
    color: white;

    @media (min-width: 768px) {
      font-size: 3em;
    }
  }
`;

const QRWrapper = styled.div`
  background-color: white; 
  padding: 2px; /* Espacio interior del contenedor */
  border-radius: 10px; // Bordes redondeados
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); // Sombra para un efecto elevado
`;

const QRDisplay = () => {
  return (
    <LandingContainer>
      <h1>Der Will</h1>
      <QRWrapper>
        <img src={qrImage} alt="Código QR" style={{ width: '200px', height: '200px' }} />
      </QRWrapper>
    </LandingContainer>
  );
};

export default QRDisplay;