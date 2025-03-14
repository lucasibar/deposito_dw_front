import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPartidas, selectStatus } from '../../../features/partidas/model/selectors';
import { actualizarEstadoPartida } from '../../../features/partidas/model/slice';
import { Loading } from '../../../shared/ui/Loading/Loading';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { 
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './PartidaList.module.css';

export const PartidaList = ({ searchTerms, estado }) => {
  const dispatch = useDispatch();
  const partidas = useSelector(selectPartidas);
  const status = useSelector(selectStatus);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPartida, setSelectedPartida] = useState(null);
  const [positionDialogOpen, setPositionDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [pendingStateChange, setPendingStateChange] = useState(null);
  const [positionData, setPositionData] = useState({
    type: '', // 'pasillo' or 'rack'
    pasillo: '',
    rack: '',
    fila: '',
    ab: '',
    kilos: '',
    unidades: ''
  });
  const [assignedPositions, setAssignedPositions] = useState([]);
  const [dialogType, setDialogType] = useState('');

  const handleIconClick = (partida, type = '') => {
    setSelectedPartida(partida);
    setDialogType(type);
    setTimeout(() => {
      setDialogOpen(true);
    }, 0);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogType('');
    setTimeout(() => {
      setSelectedPartida(null);
    }, 100);
  };

  const handleClosePositionDialog = () => {
    setPositionDialogOpen(false);
    setPositionData({
      type: '',
      pasillo: '',
      rack: '',
      fila: '',
      ab: '',
      kilos: '',
      unidades: ''
    });
    setAssignedPositions([]);
  };

  const handlePositionTypeChange = (event) => {
    const type = event.target.value;
    setPositionData({
      ...positionData,
      type,
      pasillo: type === 'pasillo' ? '' : positionData.pasillo,
      rack: type === 'rack' ? '' : positionData.rack,
      fila: type === 'rack' ? '' : positionData.fila,
      ab: type === 'rack' ? '' : positionData.ab
    });
  };

  const handlePositionDataChange = (field) => (event) => {
    setPositionData({
      ...positionData,
      [field]: event.target.value
    });
  };

  const handleAddPosition = () => {
    const newPosition = {
      ...positionData,
      id: Date.now()
    };
    setAssignedPositions([...assignedPositions, newPosition]);
    setPositionData({
      type: '',
      pasillo: '',
      rack: '',
      fila: '',
      ab: '',
      kilos: '',
      unidades: ''
    });
  };

  const handleRemovePosition = (id) => {
    setAssignedPositions(assignedPositions.filter(pos => pos.id !== id));
  };

  const calculateRemainingQuantities = () => {
    if (!selectedPartida) return { kilos: 0, unidades: 0 };

    const totalAssignedKilos = assignedPositions.reduce((sum, pos) => sum + Number(pos.kilos), 0);
    const totalAssignedUnidades = assignedPositions.reduce((sum, pos) => sum + Number(pos.unidades), 0);

    return {
      kilos: selectedPartida.kilos - totalAssignedKilos,
      unidades: selectedPartida.unidades - totalAssignedUnidades
    };
  };

  const isPositionValid = () => {
    const { type, kilos, unidades } = positionData;
    if (!type || !kilos || !unidades) return false;

    if (type === 'pasillo') {
      return !!positionData.pasillo;
    } else {
      return !!positionData.rack && !!positionData.fila && !!positionData.ab;
    }
  };

  const handleConfirmStateChange = (nuevoEstado) => {
    setPendingStateChange(nuevoEstado);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
    setPendingStateChange(null);
  };

  const handleEstadoChange = async (nuevoEstado) => {
    try {
      if (selectedPartida) {
        await dispatch(actualizarEstadoPartida({
          partidaId: selectedPartida.id,
          nuevoEstado: nuevoEstado.toLowerCase()
        })).unwrap();
      }
    } catch (error) {
      console.error('Error en componente:', error);
    } finally {
      handleCloseDialog();
      setConfirmDialogOpen(false);
    }
  };

  const renderConfirmDialog = () => {
    if (!pendingStateChange) return null;

    const getMessage = () => {
      switch (pendingStateChange) {
        case 'cuarentena-revision':
          return '¿Estás seguro que deseas devolver esta partida a revisión?';
        case 'stock':
          return '¿Estás seguro que deseas agregar esta partida al stock?';
        default:
          return '¿Estás seguro que deseas realizar este cambio?';
      }
    };

    return (
      <Dialog
        open={confirmDialogOpen}
        onClose={handleConfirmDialogClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirmar Cambio de Estado</DialogTitle>
        <DialogContent>
          <p style={{ margin: '1rem 0' }}>
            {getMessage()}
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialogClose}>Cancelar</Button>
          <Button 
            onClick={() => handleEstadoChange(pendingStateChange)}
            sx={{ color: '#2ecc71' }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const renderDialogContent = () => {
    if (!selectedPartida) return null;

    const estadoPartida = dialogType || selectedPartida.estado.toUpperCase();
    const remaining = calculateRemainingQuantities();

    switch (estadoPartida) {
      case 'CUARENTENA':
        return (
          <>
            <DialogTitle>Confirmar Testeo</DialogTitle>
            <DialogContent>
              <p style={{ margin: '1rem 0' }}>
                ¿Deseas comenzar el testeo de esta partida?
              </p>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={handleCloseDialog}
                sx={{ color: '#424242' }}
              >
                Cancelar
              </Button>
              <Button 
                onClick={() => handleEstadoChange('cuarentena-revision')}
                autoFocus
                sx={{ color: '#2ecc71' }}
              >
                Testear
              </Button>
            </DialogActions>
          </>
        );

      case 'CUARENTENA-REVISION':
        return (
          <>
            <DialogTitle>Finalizar Revisión</DialogTitle>
            <DialogContent>
              <p style={{ margin: '1rem 0' }}>
                ¿Cuál es el resultado de la revisión?
              </p>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={() => handleEstadoChange('cuarentena')}
                sx={{ color: '#424242' }}
              >
                Devolver a Cuarentena
              </Button>
              <Button 
                onClick={() => handleEstadoChange('cuarentena-aprobada')}
                sx={{ color: '#2ecc71' }}
              >
                Aprobar Mercadería
              </Button>
            </DialogActions>
          </>
        );

      case 'RECHAZAR':
        return (
          <>
            <DialogTitle>Confirmar Rechazo</DialogTitle>
            <DialogContent>
              <p style={{ margin: '1rem 0' }}>
                ¿Estás seguro que deseas rechazar esta mercadería?
              </p>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={handleCloseDialog}
                sx={{ color: '#424242' }}
              >
                Cancelar
              </Button>
              <Button 
                onClick={() => handleEstadoChange('rechazada')}
                sx={{ color: '#2ecc71' }}
              >
                Confirmar Rechazo
              </Button>
            </DialogActions>
          </>
        );

      case 'CUARENTENA-APROBADA':
        return (
          <>
            <DialogTitle>Asignar Posición</DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1">
                    Restante: {remaining.kilos} kilos, {remaining.unidades} unidades
                  </Typography>
           
                </Box>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Tipo de Posición</InputLabel>
                  <Select
                    value={positionData.type}
                    onChange={handlePositionTypeChange}
                    label="Tipo de Posición"
                  >
                    <MenuItem value="pasillo">Pasillo</MenuItem>
                    <MenuItem value="rack">Rack</MenuItem>
                  </Select>
                </FormControl>

                {positionData.type === 'pasillo' ? (
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                      label="Pasillo"
                      value={positionData.pasillo}
                      onChange={handlePositionDataChange('pasillo')}
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      label="Kilos"
                      type="number"
                      value={positionData.kilos}
                      onChange={handlePositionDataChange('kilos')}
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      label="Unidades"
                      type="number"
                      value={positionData.unidades}
                      onChange={handlePositionDataChange('unidades')}
                      sx={{ flex: 1 }}
                    />
                  </Box>
                ) : (
                  <>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <TextField
                        label="Rack"
                        value={positionData.rack}
                        onChange={handlePositionDataChange('rack')}
                        sx={{ flex: 1 }}
                      />
                      <TextField
                        label="Fila"
                        value={positionData.fila}
                        onChange={handlePositionDataChange('fila')}
                        sx={{ flex: 1 }}
                      />
                      <TextField
                        label="AB"
                        value={positionData.ab}
                        onChange={handlePositionDataChange('ab')}
                        sx={{ flex: 1 }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <TextField
                        label="Kilos"
                        type="number"
                        value={positionData.kilos}
                        onChange={handlePositionDataChange('kilos')}
                        sx={{ flex: 1 }}
                      />
                      <TextField
                        label="Unidades"
                        type="number"
                        value={positionData.unidades}
                        onChange={handlePositionDataChange('unidades')}
                        sx={{ flex: 1 }}
                      />
                    </Box>
                  </>
                )}

                <Button
                  variant="contained"
                  onClick={handleAddPosition}
                  disabled={!isPositionValid()}
                  sx={{ mb: 2 }}
                >
                  Agregar Posición
                </Button>

                {assignedPositions.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1">Posiciones Asignadas:</Typography>
                    <List>
                      {assignedPositions.map((pos) => (
                        <ListItem
                          key={pos.id}
                          secondaryAction={
                            <IconButton edge="end" onClick={() => handleRemovePosition(pos.id)}>
                              <DeleteIcon />
                            </IconButton>
                          }
                        >
                          <ListItemText
                            primary={`${pos.type === 'pasillo' ? `Pasillo ${pos.pasillo}` : `Rack ${pos.rack}, Fila ${pos.fila}, AB ${pos.ab}`}`}
                            secondary={`Kilos: ${pos.kilos}, Unidades: ${pos.unidades}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePositionDialog}>Cancelar</Button>
              <Button
                variant="contained"
                onClick={() => handleConfirmStateChange('stock')}
                disabled={remaining.kilos > 0 || remaining.unidades > 0}
                sx={{ 
                  backgroundColor: '#2ecc71',
                  '&:hover': {
                    backgroundColor: '#27ae60'
                  }
                }}
              >
                Mandar a Stock
              </Button>
            </DialogActions>
          </>
        );

      default:
        return null;
    }
  };

  if (status === 'loading') {
    return <Loading />;
  }

  // Filtrar por estado y ordenar por fecha
  const partidasFiltradas = partidas
    .filter(partida => partida.estado === estado)
    .sort((a, b) => {
      const fechaA = new Date(a.fecha.split('-').reverse().join('-'));
      const fechaB = new Date(b.fecha.split('-').reverse().join('-'));
      return fechaA - fechaB; // Cambiado a orden ascendente (más antigua primero)
    });

  // Aplicar búsqueda si hay términos
  const partidasFinal = searchTerms.length > 0
    ? partidasFiltradas.filter(partida => {
        const searchableText = `${partida.numeroPartida} ${partida.descripcionItem} ${partida.proveedor}`.toLowerCase();
        return searchTerms.every(term => searchableText.includes(term));
      })
    : partidasFiltradas;

  if (partidasFinal.length === 0) {
    return (
      <div className={styles.emptyMessage}>
        No hay partidas en este estado
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      {partidasFinal.map((partida) => (
        <div key={partida.id} className={styles.partidaItem}>
          <div className={styles.iconContainer}>
            {partida.estado !== 'cuarentena-aprobada' && (
              <DoubleArrowIcon  
                className={styles.stateIcon}
                onClick={() => handleIconClick(partida)}
                style={{ cursor: 'pointer' }}
              />
            )}
            {partida.estado === 'cuarentena-revision' && (
              <DeleteIcon 
                sx={{ color: '#2ecc71', cursor: 'pointer', fontSize: '2rem' }}
                onClick={() => handleIconClick(partida, 'RECHAZAR')}
              />
            )}
            {partida.estado === 'cuarentena-aprobada' && (
              <>
                <ChangeCircleIcon
                  sx={{ color: '#2ecc71', cursor: 'pointer', fontSize: '2rem' }}
                  onClick={() => handleConfirmStateChange('cuarentena-revision')}
                />
                <DoubleArrowIcon
                  sx={{ color: '#2ecc71', cursor: 'pointer', fontSize: '2rem' }}
                  onClick={() => handleIconClick(partida)}
                />
              </>
            )}
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.partidaHeader}>
              <div className={styles.headerLeft}>
                <h3>{partida.descripcionItem} Partida: {partida.numeroPartida}</h3>
                <p className={styles.descripcion}>{partida.proveedor}</p>
                <div className={styles.detalles}>
                  <p>Kilos: {partida.kilos}  </p>
                  <p>Unidades: {partida.unidades}</p>
                </div>
              </div>
              <div className={styles.headerRight}>
                <p className={styles.fecha}>{partida.fecha}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {dialogOpen && selectedPartida && (
        <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        {renderDialogContent()}
      </Dialog>
      
      )}

      {renderConfirmDialog()}
    </div>
  );
}; 