import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import NavBar from '../NavBar/NavBar';
import ModalPopup from './ModalPopup/ModalPopup';  // Importar el modal
import { useDispatch, useSelector } from 'react-redux';
import { partidasEnCuarentena } from '../../redux/actions';

export default function Cuarentena() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPartida, setSelectedPartida] = useState(null);
  const [kilosRestantes, setKilosRestantes] = useState(0);
  const [unidadesRestantes, setUnidadesRestantes] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(partidasEnCuarentena());
  }, [dispatch]);

  const partidasCuarentena = useSelector((state) => state.partidasCuarentena);

  const handleOpenModal = (partida) => {
    setSelectedPartida(partida);
    setKilosRestantes(partida.kilos);
    setUnidadesRestantes(partida.unidades);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleGuardarAsignacion = (data) => {
    setKilosRestantes((prev) => prev - data.kilos);
    setUnidadesRestantes((prev) => prev - data.unidades);

    if (kilosRestantes - data.kilos > 0 || unidadesRestantes - data.unidades > 0) {
      setOpenModal(true);  // Reabrir el modal si quedan kilos o unidades por asignar
    }
  };

  return (
    <>
      <NavBar titulo={"Cuarentena"} />
      <Box sx={{ padding: 2 }}>
        {partidasCuarentena?.map((partida, index) => (
          <Paper
            key={index}
            sx={{
              padding: 2,
              marginBottom: 2,
              borderRadius: '16px',
              cursor: 'pointer',
            }}
            onClick={() => handleOpenModal(partida)}
          >
            <Typography variant="subtitle1">
              {`Partida: ${partida.numeroPartida}`}
            </Typography>
            <Typography variant="body2">
              {`${partida.item.proveedor.nombre} ${partida.item.categoria} ${partida.item.descripcion}`}
            </Typography>
          </Paper>
        ))}

        {selectedPartida && (
          <ModalPopup
            open={openModal}
            handleClose={handleCloseModal}
            partida={selectedPartida}
            kilosRestantes={kilosRestantes}
            unidadesRestantes={unidadesRestantes}
            handleGuardarAsignacion={handleGuardarAsignacion}
          />
        )}
      </Box>
    </>
  );
}