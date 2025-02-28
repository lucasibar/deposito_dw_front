import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { obtenerItemsPorPosicion } from '../../../redux/actions';
import { Paper, Typography, Box, IconButton, SpeedDial, SpeedDialIcon } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NavBar from '../../Utils/NavBar';

import MovimientoModal from './MovimientoModal/MovimientoModal';
import AjusteModal from './AjusteModal/AjusteModal';
import RemitoSalidaModal from './RemitoSalidaModal/RemitoSalidaModal';
import Devolucion from './Devolucion/Devolucion'

export default function Posiciones() {
  const { id, rack, fila, AB } = useParams();
  const dispatch = useDispatch();
  const itemsPosicion = useSelector((state) => state.itemsPosicion);
  const [itemsArenderizar, setItemsArenderizar] = useState(false);


  useEffect(() => {
    dispatch(obtenerItemsPorPosicion(id));
  }, [dispatch, id]);

  useEffect(() => {
    setItemsArenderizar(itemsPosicion);
  }, [itemsPosicion]);

  const [openMovimientoModal, setOpenMovimientoModal] = useState(false);
  const [openAjusteModal, setOpenAjusteModal] = useState(false);
  const [openRemitoModal, setOpenRemitoModal] = useState(false);
  const [openAdicionRapida, setOpenAdicionRapida] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenMovimientoModal = (item) => { setSelectedItem(item); setOpenMovimientoModal(true); };
  const handleCloseMovimientoModal = () => setOpenMovimientoModal(false);

  const handleOpenAjusteModal = (item) => { setSelectedItem(item); setOpenAjusteModal(true); };
  const handleCloseAjusteModal = () => setOpenAjusteModal(false); 

  const handleOpenRemitoModal = (item) => { setSelectedItem(item); setOpenRemitoModal(true); };
  const handleCloseRemitoModal = () => setOpenRemitoModal(false);

  const handleOpenAdicionRapida = () => setOpenAdicionRapida(true);
const handleCloseAdicionRapida = () => setOpenAdicionRapida(false);

  return (
    <>
      <NavBar titulo={`Posición F${rack} - R${fila} - P${AB}`} />
      <Box sx={{ padding: 2 }}>
        {itemsArenderizar.length > 0 ? (
          itemsArenderizar.map((item, index) => (
            item.kilos > 0 && item.unidades > 0 ? (
              <Paper
                key={index}
                sx={{ padding: 2, marginBottom: 2, borderRadius: '16px', cursor: 'pointer', position: 'relative' }}
              >
                <Typography variant="subtitle1">{`Partida: ${item.partida}`}</Typography>
                <Typography variant="body2" mt={2}>
                  {item.proveedor.nombre} {item.categoria} {item.descripcion}
                </Typography>
                
                <Typography variant="body2" mt={2}>
                  Kilos: 
                  <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => handleOpenAjusteModal(item)}>
                    {item.kilos}
                  </span> 
                  - Unidades: 
                  <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => handleOpenAjusteModal(item)}>
                    {item.unidades}
                  </span>
                </Typography>

                <IconButton sx={{ position: 'absolute', bottom: 8, right: 8 }} color="error" onClick={() => handleOpenMovimientoModal(item)}>
                  <KeyboardDoubleArrowRightIcon />
                </IconButton>

                <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} color="primary" onClick={() => handleOpenRemitoModal(item)}>
                <Typography sx={{ color: 'blue', fontWeight: 'bold', fontSize: '0.875rem' }}>
                        Remito Salida
                </Typography>
                </IconButton>
              </Paper>
            ) : null
          ))
        ) : (
          <Typography variant="body2" mt={2}>
            No se encontraron ítems para esta posición.
          </Typography>
        )}

        {/* SpeedDial para abrir el modal de Nuevo Item */}
        <SpeedDial
      ariaLabel="Agregar nuevo item"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
      onClick={handleOpenAdicionRapida}
    />

        {/* Modales */}
        {selectedItem && (
          <>
            <MovimientoModal open={openMovimientoModal} onClose={handleCloseMovimientoModal} item={selectedItem} id={id} />
            <AjusteModal open={openAjusteModal} onClose={handleCloseAjusteModal} item={selectedItem} />
            <RemitoSalidaModal open={openRemitoModal} onClose={handleCloseRemitoModal} item={selectedItem} id={id} />
          </>
        )}
        
        <Devolucion open={openAdicionRapida} onClose={handleCloseAdicionRapida} idPosicion={id}/>
        </Box>
    </>
  );
}
