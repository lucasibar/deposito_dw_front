import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


export default function ControlStock() {
  const cajas = useSelector((state) => state.cajasCuarentena);
  let racks = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
  let filas = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
  let piso = ["A", "B"]

  let posiciones = []


  for (let i=0; i<racks.length; i++){
    for (let j=0; j<filas.length; j++){
      for (let p =0; p<piso.length; p++){
      let codigoPosicion = `${i} - ${j} - ${p}`
      posiciones.push(codigoPosicion)
      }
    } 
  }


  return (
    <div className='cajaContenedor'>

    <input placeholder='ESCANEAR CODIGO DE BARRAS'></input>
    <br/>

      {posiciones?.map((posicion, i)=>
      <button>{posicion}</button>
      )}
    </div>
  );
}