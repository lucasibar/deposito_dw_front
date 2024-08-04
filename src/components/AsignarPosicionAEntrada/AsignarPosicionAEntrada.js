import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import FormAsignarPosicionAEntrada from './FormAsignarPosicionAEntrada/FormAsignarPosicionAEntrada';
import KilosAPosicion from '../AsignarPosicionAEntrada/KilosAPosicion/KilosAPosicion'
import { Button } from '@mui/material';
import {movimientoPosicion1Posicion2} from '../../redux/actions'


export default function AsignarPosicionAEntrada() {
  const partidasDeEntradaAPosicion = useSelector((state) => state.partidasDeEntradaAPosicion);
  const dispatch = useDispatch();

  const cambiarPosicion = () => {
    dispatch(movimientoPosicion1Posicion2(partidasDeEntradaAPosicion));
  };
  return (
    <>
      <NavBar titulo={"Asignar posición a la mercadería que entró"} />
      <FormAsignarPosicionAEntrada />
      <KilosAPosicion/>

      <Button onClick={cambiarPosicion} sx={{ width: '350px', mt: '30px'}} variant="contained">SUBIR REMITO</Button>

    </>
  );
}