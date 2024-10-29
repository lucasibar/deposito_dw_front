import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import NavBar from '../Utils/NavBar';
import ModalPopup from './ModalPopup/ModalPopup';  // Importar el modal
import { useDispatch, useSelector } from 'react-redux';
import { partidasEnCuarentena } from '../../redux/actions';

export default function Cuarentena() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPartida, setSelectedPartida] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(partidasEnCuarentena());
  }, [dispatch]);

  const partidasCuarentena = useSelector((state) => state.partidasCuarentena);
  const [partidasRenderizar, setPartidasRenderizar] = useState([])

  useEffect(() => {
    setPartidasRenderizar(partidasCuarentena);
  }, [partidasCuarentena]);


  const handleOpenModal = (partida) => {
    setSelectedPartida(partida);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  return (
    <>
      <NavBar titulo={"Cuarentena"} />
      <Box sx={{ padding: 2 }}>
      {partidasRenderizar?.length > 0 ? (
        partidasRenderizar.map((partida, index) => (

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
            <Typography variant="body2" mt={2}>
            {`${partida.item.proveedor.nombre} ${partida.item.categoria} ${partida.item.descripcion}`}
            </Typography>
            <Typography variant="body2" mt={2}>
            Kilos: {partida.kilos} - Unidades: {partida.unidades}
            </Typography>
        </Paper>
        ))
      ) : (
        <Typography variant="body2" mt={2}>
          No se encontraron ítems en estado de cuarentena.
        </Typography>
      )}
      {selectedPartida && (
        <ModalPopup
          open={openModal}
          handleClose={handleCloseModal}
          partida={selectedPartida}
        />
      )}
      </Box>
    </>
  );
}