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
import { addPartidaOrdenPedido, updatePartidaOrdenPedido, dataProveedoresItems } from '../model/slice';
import Swal from 'sweetalert2';
import axios from 'axios';

const URL = "https://derwill-deposito-backend.onrender.com";

// Agregamos las categorías como una constante
const CATEGORIAS = [
  "costura", "algodon", "algodon-color", "nylon", "nylon-color", "lycra", 
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
  const allItems = useSelector(state => state.ordenPedido?.items || []);
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
      setPartida({
        item: editingPartida.itemId,
        partidaNumero: editingPartida.partidaNumero,
        kilos: editingPartida.kilos,
        unidades: editingPartida.unidades
      });
      setOriginalValues(editingPartida);
    }
  }, [editingPartida]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartida(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCloseModal = () => {
    setPartida({
      item: '',
      partidaNumero: '',
      kilos: '',
      unidades: ''
    });
    onClose();
  };

  const handleSubmit = async () => {
    if (!partida.item || !partida.partidaNumero || !partida.kilos || !partida.unidades) {
      Swal.fire({
        title: "Error",
        text: "Todos los campos son obligatorios",
        icon: "error"
      });
      return;
    }

    const selectedItem = itemsProveedor.find(item => item.id === partida.item);
    
    const nuevaPartida = {
      itemId: selectedItem.id,
      itemNombre: `${selectedItem.categoria} - ${selectedItem.descripcion}`,
      partidaNumero: partida.partidaNumero,
      kilos: parseFloat(partida.kilos),
      unidades: parseInt(partida.unidades),
      proveedorId: proveedor.id
    };

    if (editingIndex !== null) {
      dispatch(updatePartidaOrdenPedido({ index: editingIndex, partida: nuevaPartida }));
    } else {
      dispatch(addPartidaOrdenPedido(nuevaPartida));
    }

    handleCloseModal();
  };

  const handleSubmitNuevoItem = async () => {
    try {
      const response = await axios.post(`${URL}/items`, {
        ...nuevoItem,
        proveedor: proveedor.id
      });
      
      dispatch(dataProveedoresItems());
      setOpenNuevoItem(false);
      setNuevoItem({
        descripcion: "",
        categoria: ""
      });
      
      Swal.fire({
        title: "Éxito",
        text: "Item creado correctamente",
        icon: "success"
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error"
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
        <DialogTitle>
          {editingPartida ? 'Editar Partida' : 'Agregar Nueva Partida'}
        </DialogTitle>
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
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingPartida ? 'Guardar Cambios' : 'Agregar'}
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