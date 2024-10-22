import React, { useState, useEffect } from 'react';
import {IconButton, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ListadoKilosPartidaPorPosicion({ distribucionDeKilosEnPosiciones, setDistribucionDeKilosEnPosiciones }) {

  const handleDelete = (index) => {
    const nuevaDistribucion = distribucionDeKilosEnPosiciones.filter((_, i) => i !== index);
    setDistribucionDeKilosEnPosiciones(nuevaDistribucion);
  };
  return (
    <>
    {distribucionDeKilosEnPosiciones?.map((partida, index) => (
      <div key={index}>
        <Typography variant="body2" gutterBottom>
          {partida.pasillo ?
            `Part ${partida.partida.numeroPartida}: Kgs ${partida.kilos} | Und ${partida.unidades} => ${partida.pasillo}` :
            `Part ${partida.partida.numeroPartida}: Kgs ${partida.kilos} | Und ${partida.unidades} => ${partida.rack}-${partida.fila}-${partida.ab}`
          }
        </Typography>
        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index)}>
          <DeleteIcon />
        </IconButton>
      </div>
    ))}
  </>

  );
}