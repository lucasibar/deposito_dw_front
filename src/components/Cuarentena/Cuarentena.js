  import React, { useEffect, useState } from 'react';
  import { Paper, Typography, Box, IconButton } from '@mui/material';
  import CheckIcon from '@mui/icons-material/Check';
  import CloseIcon from '@mui/icons-material/Close';
  import DoneAllIcon from '@mui/icons-material/DoneAll'; // Importa el nuevo ícono
  import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'; // Importa el nuevo ícono
  import NavBar from '../Utils/NavBar';
  import ModalPopup from './ModalPopup/ModalPopup';
  import { useDispatch, useSelector } from 'react-redux';
  import { partidasEnCuarentena, aprobarPartida, atrasAprobarPartida, rechazarPartida } from '../../redux/actions';
  import Swal from 'sweetalert2';

  export default function Cuarentena() {
    const [openModal, setOpenModal] = useState(false);
    const [selectedPartida, setSelectedPartida] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(partidasEnCuarentena());
    }, [dispatch]);

    const partidasCuarentena = useSelector((state) => state.partidasCuarentena);
    const [partidasRenderizar, setPartidasRenderizar] = useState([]);

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

    const handleAprobarPartida = (id) => {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "Vas a aprobar la partida.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, aprobar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(aprobarPartida(id));
        }
      });
    };

    const handleVolverAtrasAprobarPartida = (id) => {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "La partida se va a volver a chequear",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, volver a chequear!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(atrasAprobarPartida(id));
        }
      });
    };

    const handleRechazarPartida = (id) => {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "Vas a rechazar la partida.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, rechazar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(rechazarPartida(id));
        }
      });
    };

    const handleTogglePartidaEstado = (partida) => {
      if (partida.estado === 'cuarentena-aprobada') {
        handleVolverAtrasAprobarPartida(partida.id);
      } else {
        handleAprobarPartida(partida.id);
      }
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
                  position: 'relative',
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

                {/* Botón de aprobación (tilde) */}
                <IconButton
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                  color={partida.estado === 'cuarentena-aprobada' ? 'default' : 'primary'}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTogglePartidaEstado(partida);
                  }}
                >
                  {partida.estado === 'cuarentena-aprobada' ? (
                    <DoneAllIcon sx={{ color: 'green' }} /> // Cambia el color a verde
                  ) : (
                    <CheckIcon />
                  )}
                </IconButton>

                {/* Botón de rechazo (cruz) */}
                <IconButton
                  sx={{ position: 'absolute', bottom: 8, right: 8 }}
                  color={partida.estado === 'cuarentena-aprobada' ? 'secondary' : 'default'}
                  onClick={(e) => {
                  e.stopPropagation();
                  // Si el estado es 'cuarentena-aprobada', selecciona la partida y abre el modal
                  if (partida.estado === 'cuarentena-aprobada') {
                  handleOpenModal(partida);
                  } else {
                  // Si no, rechaza la partida como antes
                  handleRechazarPartida(partida.id);
                  }
                  }}
                >
                  {partida.estado === 'cuarentena-aprobada' ? (
                    <KeyboardDoubleArrowRightIcon />
                  ) : (
                    <CloseIcon />
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
