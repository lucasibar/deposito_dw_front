import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; 
import { obtenerItemsPorPosicion } from '../../redux/actions'; 
import { Paper, Typography, Box } from '@mui/material';
import NavBar from '../Utils/NavBar';
import ModalPopup from './ModalPopup/ModalPopup'; 


export default function Posicion() {
  const { id } = useParams(); 
  const dispatch = useDispatch();


  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  useEffect(() => {
    dispatch(obtenerItemsPorPosicion(id)); // Dispatch para obtener los ítems según la posición
  }, [dispatch, id]);
  
  const itemsPosicion = useSelector((state) => state.itemsPosicion);


  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
<NavBar titulo={`Posicion ` }/>
    <Box sx={{ padding: 2 }}>
      {itemsPosicion.length > 0 ? (
        itemsPosicion.map((item, index) => (
          <Paper
            key={index}
            sx={{
              padding: 2,
              marginBottom: 2,
              borderRadius: '16px',
              cursor: 'pointer',
            }}
            onClick={() => handleOpenModal(item)}
          >
            <Typography variant="subtitle1">
              {`Partida: ${item.partida}`}
            </Typography>
            <Typography variant="body2" mt={2}>
              Proveedor: {item.proveedor.nombre}
            </Typography>
            <Typography variant="body2" mt={2}>
              Kilos: {item.kilos} - Unidades: {item.unidades}
            </Typography>
          </Paper>
        ))
      ) : (
        <Typography variant="body2" mt={2}>
          No se encontraron ítems para esta posición.
        </Typography>
      )}
      {selectedItem && (
        <ModalPopup
          open={openModal}
          handleClose={handleCloseModal}
          item={selectedItem}
          posicionActualId={id}
        />
      )}
    </Box>
    </>
  );
}