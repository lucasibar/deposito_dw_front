import * as React from 'react';
import NuevoPallet from './NuevoPallet/NuevoPallet';
import ListaPartidasSinPallets from './ListaPartidasSinPallets/ListaPartidasSinPallets';
import {partidasSinPallet} from '../../redux/actions'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ArmadoPallets() {
  const partidasSinPallets = useSelector((state) => state.partidasSinPallets);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(partidasSinPallet())
  },[dispatch])


  return (
    <div className='cajaContenedor'>
      <NuevoPallet/>

      <ListaPartidasSinPallets/>
    </div>
  );
}