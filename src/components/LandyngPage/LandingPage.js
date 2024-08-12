import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { dataLoad } from '../../redux/actions';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';


const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
  background-color: #0073e6; /* Color de fondo azul similar */
  height: 100vh;
  justify-content: flex-start;
  padding-top: 20vh; /* Padding superior para ajustar la posición en pantallas grandes */

  @media (max-width: 768px) {
    padding-top: 20px; /* Ajuste para pantallas pequeñas */
  }

  h1 {
    margin-bottom: 20px;
    font-size: 2em;
    font-family: 'Raleway', sans-serif; /* Fuente similar */
    font-weight: 700;
    color: white;

    @media (min-width: 768px) {
      font-size: 3em;
    }
  }

  .navButton {
    margin: 10px 0;
    width: 100%;

    @media (min-width: 768px) {
      width: 350px;
    }

    button {
      width: 100%;
      background-color: white;
    }
  }
`;

export default function LandingPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dataLoad());
  }, [dispatch]);

  function usuarioNohabilitado() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Usuario no habilitado",
    });
  }

  return (
    <LandingContainer>
      <h1>Der Will</h1>
      <NavLink to="/deposito_dw_front/remito" className="navButton">
        <Button variant="outlined">SUBIR REMITO</Button>
      </NavLink>
      <NavLink to="/deposito_dw_front/asignar-posicion" className="navButton">
        <Button variant="outlined">ASIGNAR POSICION A MERCADERIA</Button>
      </NavLink>

      <NavLink to="/deposito_dw_front/cuarentena" className="navButton">
        <Button variant="outlined">MERCADERIA EN CUARENTENA</Button>
      </NavLink>
      <NavLink to="/deposito_dw_front/stock" className="navButton">
        <Button variant="outlined">STOCK</Button>
      </NavLink>
      <NavLink to="/deposito_dw_front/posiciones" className="navButton">
        <Button variant="outlined">POSICIONES</Button>
      </NavLink>
      <NavLink to="/deposito_dw_front/movimiento-interno" className="navButton">
        <Button variant="outlined">MOVIMIENTO INTERNO</Button>
      </NavLink>
      <NavLink to="/deposito_dw_front/salidas" className="navButton">
        <Button variant="outlined">SALIDA DE MERCADERIA</Button>
      </NavLink>
      {/* <NavLink to="/deposito_dw_front/salidas" className="navButton"> */}
        <Button variant="outlined">CARGAR MERCADERIA "VIEJO"</Button>
      {/* </NavLink> */}

      <div className="navButton">
        <Button variant="outlined" onClick={usuarioNohabilitado}>
          DASHBOARD ADMINISTRADOR
        </Button>
      </div>
    </LandingContainer>
  );
}