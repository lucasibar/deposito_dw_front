import React, { useState, useEffect } from 'react';
import { Box, SpeedDial, SpeedDialIcon } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ListaItems } from '../../../../features/posicion/ui/ListaItems';
import { MovimientoModal } from '../../../../features/posicion/ui/MovimientoModal';
import { AjusteModal } from '../../../../features/posicion/ui/AjusteModal';
import { RemitoSalidaModal } from '../../../../features/posicion/ui/RemitoSalidaModal';
import { DevolucionModal } from '../../../../features/posicion/ui/DevolucionModal';
import { BarraPosicion } from '../../../../features/posicion/ui/BarraPosicion';

export const PosicionWidget = () => {
  const { id, rack, fila, AB } = useParams();
  console.log('Params:', { id, rack, fila, AB }); // Para debug

  const [openMovimientoModal, setOpenMovimientoModal] = useState(false);
  const [openAjusteModal, setOpenAjusteModal] = useState(false);
  const [openRemitoModal, setOpenRemitoModal] = useState(false);
  const [openDevolucionModal, setOpenDevolucionModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenMovimientoModal = (item) => {
    setSelectedItem(item);
    setOpenMovimientoModal(true);
  };

  const handleOpenAjusteModal = (item) => {
    setSelectedItem(item);
    setOpenAjusteModal(true);
  };

  const handleOpenRemitoModal = (item) => {
    setSelectedItem(item);
    setOpenRemitoModal(true);
  };

  return (
    <>
      <BarraPosicion titulo={`Posición F${rack} - R${fila} - P${AB}`} />
      <Box sx={{ padding: 2 }}>
        <ListaItems 
          posicionId={id}
          onMovimiento={handleOpenMovimientoModal}
          onAjuste={handleOpenAjusteModal}
          onRemito={handleOpenRemitoModal}
        />

        <SpeedDial
          ariaLabel="Agregar nuevo item"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClick={() => setOpenDevolucionModal(true)}
        />

        {selectedItem && (
          <>
            <MovimientoModal
              open={openMovimientoModal}
              onClose={() => setOpenMovimientoModal(false)}
              item={selectedItem}
              posicionId={id}
            />
            <AjusteModal
              open={openAjusteModal}
              onClose={() => setOpenAjusteModal(false)}
              item={selectedItem}
            />
            <RemitoSalidaModal
              open={openRemitoModal}
              onClose={() => setOpenRemitoModal(false)}
              item={selectedItem}
              posicionId={id}
            />
          </>
        )}

        <DevolucionModal
          open={openDevolucionModal}
          onClose={() => setOpenDevolucionModal(false)}
          posicionId={id}
        />
      </Box>
    </>
  );
}; 