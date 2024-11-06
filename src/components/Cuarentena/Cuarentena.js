import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, IconButton, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import UpdateIcon from '@mui/icons-material/Update';
import NavBar from '../Utils/NavBar';
import ModalPopup from './ModalPopup/ModalPopup';
import { useDispatch, useSelector } from 'react-redux';
import { partidasEnCuarentena, cambiarEstadoPartida } from '../../redux/actions';
import Swal from 'sweetalert2';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export default function Cuarentena() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPartida, setSelectedPartida] = useState(null);
  const [filtroNumeroPartida, setFiltroNumeroPartida] = useState(''); // Estado para el filtro de número de partida
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(partidasEnCuarentena());
  }, [dispatch]);

  const partidasCuarentena = useSelector((state) => state.partidasCuarentena);

  // Maneja la apertura del modal
  const handleOpenModal = (partida) => {
    setSelectedPartida(partida);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Maneja el cambio de estado de la partida
  const handleTogglePartidaEstado = (partida) => {
    // Aquí va el código que maneja el cambio de estado y las alertas
  };

  // Maneja el rechazo de la partida
  const handleRechazarPartida = (partida) => {
    // Aquí va el código que maneja el rechazo de la partida
  };

  // Filtra las partidas en función del número de partida ingresado
  const partidasFiltradas = partidasCuarentena.filter((partida) =>
    partida.numeroPartida.toString().includes(filtroNumeroPartida)
  );

  return (
    <>
      <NavBar titulo={"Cuarentena"} />
      <Box sx={{ padding: 2 }}>

        {/* Input para filtrar por número de partida */}
        <TextField
          label="Buscar por Número de Partida"
          variant="outlined"
          fullWidth
          margin="normal"
          value={filtroNumeroPartida}
          onChange={(e) => setFiltroNumeroPartida(e.target.value)} // Actualiza el estado en tiempo real
        />

        {/* Lista de partidas filtradas */}
        {partidasFiltradas.length > 0 ? (
          partidasFiltradas.map((partida) => (
            <Paper
              key={partida.id}
              sx={{
                padding: 2,
                marginBottom: 2,
                borderRadius: '16px',
                cursor: 'pointer',
                position: 'relative',
              }}
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

              {/* Botón de cambio de estado */}
              <IconButton
                sx={{ position: 'absolute', top: 8, right: 8 }}
                color={
                  partida.estado === 'cuarentena-aprobada'
                    ? 'default'
                    : partida.estado === 'cuarentena-revision'
                    ? 'primary'
                    : 'secondary'
                }
                onClick={(e) => {
                  e.stopPropagation();
                  handleTogglePartidaEstado(partida);
                }}
              >
                {partida.estado === 'cuarentena' ? (
                  <CheckIcon />
                ) : partida.estado === 'cuarentena-revision' ? (
                  <UpdateIcon sx={{ color: 'orange' }} />
                ) : (
                  <DoneAllIcon sx={{ color: 'green' }} />
                )}
              </IconButton>
              <IconButton
                sx={{ position: 'absolute', bottom: 8, right: 8 }}
                color="error"
              >
                {partida.estado === 'cuarentena-aprobada' ? (
                  <KeyboardDoubleArrowRightIcon onClick={() => handleOpenModal(partida)} />
                ) : (
                  <CloseIcon onClick={(e) => { handleRechazarPartida(partida); }} />
                )}
              </IconButton>
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
