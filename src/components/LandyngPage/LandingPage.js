import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getPosiciones } from '../../redux/actions';

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  /* Centra vertical y horizontalmente */
  text-align: center;
  background-color: #0073e6; /* Color de fondo azul similar */
  height: 100vh;
  padding: 0 20px;

  h1 {
    margin-bottom: 20px;  /* Separación entre el texto y el loading */
    font-size: 2em;
    font-family: 'Raleway', sans-serif; /* Fuente similar */
    font-weight: 700;
    color: white;

    @media (min-width: 768px) {
      font-size: 3em;
    }
  }
`;

export default function LandingPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    
    const timeoutId = setTimeout(() => {
      // dispatch(getPosiciones());
      navigate("/deposito_dw_front/home");
    }, 1000); 

    return () => clearTimeout(timeoutId);
  }, [dispatch]);

  
  // const posiciones = useSelector((state) => state.posiciones);
  // useEffect(() => {
  //   if (posiciones[1]) {
  //     navigate("/deposito_dw_front/home");
  //   }
  // }, [posiciones, navigate]);

  return (
    <LandingContainer>
      <h1>Der Will</h1>
      <CircularProgress sx={{ color: 'white' }} /> 
    </LandingContainer>
  );
}