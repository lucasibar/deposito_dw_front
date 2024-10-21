import React, { useState, useEffect } from 'react';
import {Typography} from '@mui/material';

export default function ListadoKilosPartidaPorPosicion({ distribucionDeKilosEnPosiciones }) {


  return (
    <>
    {distribucionDeKilosEnPosiciones?.map((partida, index) => (
        <div key={index}>
        <Typography variant="body2" gutterBottom>
          {partida.pasillo?
          `Part ${partida.partida.numeroPartida}: Kgs ${partida.kilos} | Und ${partida.unidades} => ${partida.pasillo}`
          :  
          `Part ${partida.partida.numeroPartida}: Kgs ${partida.kilos} | Und ${partida.unidades} => ${partida.rack}-${partida.fila}-${partida.ab}`
          }
        </Typography>
     </div>
    ))}
  </>
  );
}