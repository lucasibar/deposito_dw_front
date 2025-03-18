import React, { useState } from 'react';
import { Box } from '@mui/material';
import { BarraCuarentena } from '../../../../features/cuarentena/ui/BarraCuarentena';
import { ListaPartidas } from '../../../../features/cuarentena/ui/ListaPartidas';
import { ModalPosicion } from '../../../../features/cuarentena/ui/ModalPosicion';
import { BotonesNavegacion } from '../../../../shared/ui/BotonesNavegacion';

export const CuarentenaWidget = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPartida, setSelectedPartida] = useState(null);

  const handleOpenModal = (partida) => {
    setSelectedPartida(partida);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPartida(null);
  };

  return (
    <div>
      <BarraCuarentena titulo="Cuarentena" />
      <BotonesNavegacion pagina="cuarentena" />
      <Box sx={{ padding: 2 }}>
        <ListaPartidas onAsignarPosicion={handleOpenModal} />
      </Box>
      {selectedPartida && (
        <ModalPosicion
          open={openModal}
          handleClose={handleCloseModal}
          partida={selectedPartida}
        />
      )}
    </div>
  );
}; 