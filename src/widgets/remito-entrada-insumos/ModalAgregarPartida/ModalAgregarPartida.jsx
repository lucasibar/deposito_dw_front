import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { addPartidaRemitoEntrada, updatePartidaRemitoEntrada, dataProveedoresItems } from '../../../features/remitos/model/slice';
import Swal from 'sweetalert2';
import axios from 'axios';

const URL = "https://derwill-deposito-backend.onrender.com";

// Agregamos las categorías como una constante
const CATEGORIAS = [
  "costura", "algodon", "algodon-color", "nylon", "nylon REC", "nylon-color", "lycra", "lycra REC", 
  "goma", "tarugo", "etiqueta", "bolsa", "percha", "ribbon", "caja", 
  "cinta", "plantilla", "film", "consumibes(aceite y parafina)", "faja", "caballete"
];

const NuevoItemModal = ({ open, onClose, nuevoItem, setNuevoItem, onSubmit }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Agregar Nuevo Item</DialogTitle>
    <DialogContent>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Categoría</InputLabel>
          <Select
            value={nuevoItem.categoria}
            label="Categoría"
            onChange={(e) => setNuevoItem({...nuevoItem, categoria: e.target.value})}
          >
            {CATEGORIAS.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <TextField
          label="Descripción"
          value={nuevoItem.descripcion}
          onChange={(e) => setNuevoItem({...nuevoItem, descripcion: e.target.value})}
          fullWidth
          required
          sx={{
            mt: 2
          }}
        />
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancelar</Button>
      <Button onClick={onSubmit}>Guardar</Button>
    </DialogActions>
  </Dialog>
);

export const ModalAgregarPartida = ({ 
  open, 
  onClose, 
  proveedor,
  editingPartida = null,
  editingIndex = null 
}) => {
  const dispatch = useDispatch();
  const allItems = useSelector(state => state.remitos?.items || []);
  const itemsProveedor = allItems.filter(item => item.proveedor?.id === proveedor?.id);

  // Guardamos los valores originales cuando estamos editando
  const [originalValues, setOriginalValues] = useState(null);
  const [partida, setPartida] = useState({
    item: '',
    partidaNumero: '',
    kilos: '',
    unidades: ''
  });

  // Estado para el modal de nuevo ítem
  const [openNuevoItem, setOpenNuevoItem] = useState(false);
  const [nuevoItem, setNuevoItem] = useState({
    descripcion: "",
    categoria: ""
  });

  useEffect(() => {
    if (editingPartida) {
      const editValues = {
        item: editingPartida.item,
        partidaNumero: editingPartida.partidaNumero,
        kilos: editingPartida.kilos.toString(),
        unidades: editingPartida.unidades.toString()
      };
      setPartida(editValues);
      setOriginalValues(editValues);
    } else {
      setOriginalValues(null);
      resetForm();
    }
  }, [editingPartida]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartida(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const hasUnsavedChanges = () => {
    // Si estamos editando, comparamos con los valores originales
    if (originalValues) {
      return JSON.stringify(partida) !== JSON.stringify(originalValues);
    }
    // Si es una nueva partida, verificamos si hay algún campo con datos
    return partida.item || partida.partidaNumero || partida.kilos || partida.unidades;
  };

  const handleCloseModal = async () => {
    if (hasUnsavedChanges()) {
      const result = await Swal.fire({
        title: '¿Guardar cambios?',
        text: editingPartida 
          ? 'Hay cambios sin guardar en la partida, ¿quieres guardarlos?' 
          : 'No agregaste todavía esta partida a la lista, ¿quieres agregarla?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'No, descartar'
      });

      if (result.isConfirmed) {
        handleSubmit();
      }
    }
    onClose();
  };

  const resetForm = () => {
    setPartida({
      item: '',
      partidaNumero: '',
      kilos: '',
      unidades: ''
    });
  };

  const handleSubmit = () => {
    const itemSeleccionado = allItems.find(item => item.id === partida.item);
    
    const nuevaPartida = {
      numeroPartida: partida.partidaNumero.toString(),
      kilos: parseFloat(partida.kilos),
      unidades: parseInt(partida.unidades),
      item: itemSeleccionado
    };

    if (editingIndex !== null) {
      dispatch(updatePartidaRemitoEntrada({ index: editingIndex, partida: nuevaPartida }));
      Swal.fire({
        title: 'Éxito',
        text: 'Partida actualizada correctamente',
        icon: 'success',
        timer: 1500
      });
    } else {
      dispatch(addPartidaRemitoEntrada(nuevaPartida));
      Swal.fire({
        title: 'Éxito',
        text: 'Partida agregada correctamente',
        icon: 'success',
        timer: 1500
      });
    }
    
    resetForm();
  };

  const handleSubmitNuevoItem = async () => {
    if (!nuevoItem.descripcion || !nuevoItem.categoria) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor complete todos los campos',
        icon: 'error'
      });
      return;
    }

    try {
      const response = await axios.post(`${URL}/items`, {
        descripcion: nuevoItem.descripcion,
        categoria: nuevoItem.categoria,
        proveedor: proveedor
      });

      // Recargar la lista de items y proveedores
      dispatch(dataProveedoresItems());

      Swal.fire({
        title: 'Éxito',
        text: 'Item creado correctamente',
        icon: 'success',
        timer: 1500
      });

      setOpenNuevoItem(false);
      setNuevoItem({ descripcion: "", categoria: "" });
      
      // Seleccionar automáticamente el nuevo item
      setPartida(prev => ({
        ...prev,
        item: response.data.id
      }));
      
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Error al crear el item',
        icon: 'error'
      });
    }
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={handleCloseModal}
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle>Agregar Nueva Partida</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              select
              label="Item"
              name="item"
              value={partida.item}
              onChange={handleChange}
              fullWidth
              required
            >
              <MenuItem 
                value="nuevo_item"
                sx={{
                  color: '#2ecc71',
                  fontWeight: 'bold'
                }}
                onClick={() => setOpenNuevoItem(true)}
              >
                <em>+ Agregar nuevo item</em>
              </MenuItem>
              {itemsProveedor.length > 0 ? (
                itemsProveedor.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {`${item.categoria} - ${item.descripcion}`}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>
                  No hay items disponibles para este proveedor
                </MenuItem>
              )}
            </TextField>

            <TextField
              label="Número de Partida"
              name="partidaNumero"
              value={partida.partidaNumero}
              onChange={handleChange}
              fullWidth
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#2ecc71',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#2ecc71',
                }
              }}
            />

            <TextField
              label="Kilos"
              name="kilos"
              type="number"
              value={partida.kilos}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ min: 0, step: "0.01" }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#2ecc71',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#2ecc71',
                }
              }}
            />

            <TextField
              label="Unidades"
              name="unidades"
              type="number"
              value={partida.unidades}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ min: 0, step: 1 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#2ecc71',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#2ecc71',
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseModal}
            sx={{
              color: '#2ecc71',
            }}
          >
            Cerrar
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="outlined"
            disabled={!partida.item || !partida.partidaNumero || !partida.kilos || !partida.unidades}
            sx={{
              color: '#2ecc71',
              borderColor: '#2ecc71',
              '&:hover': {
                borderColor: '#27ae60',
                color: '#27ae60',
                bgcolor: 'transparent'
              }
            }}
          >
            Agregar Partida
          </Button>
        </DialogActions>
      </Dialog>

      <NuevoItemModal 
        open={openNuevoItem}
        onClose={() => setOpenNuevoItem(false)}
        nuevoItem={nuevoItem}
        setNuevoItem={setNuevoItem}
        onSubmit={handleSubmitNuevoItem}
      />
    </>
  );
}; 