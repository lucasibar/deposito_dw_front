import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';

const URL = "https://derwill-deposito-backend.onrender.com";

const initialState = {
  posiciones: [],
  itemsPosicion: [],
  loading: false,
  error: null
};

const posicionSlice = createSlice({
  name: 'posicion',
  initialState,
  reducers: {
    setPosiciones: (state, action) => {
      state.posiciones = action.payload;
    },
    setItemsPosicion: (state, action) => {
      state.itemsPosicion = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setPosiciones, setItemsPosicion, setLoading, setError } = posicionSlice.actions;

// Thunks
export const fetchPosiciones = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${URL}/posiciones/items`);
    dispatch(setPosiciones(response.data));
  } catch (error) {
    dispatch(setError(error.message));
    Swal.fire({
      title: "Error",
      text: "No se pudieron cargar las posiciones",
      icon: "error"
    });
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchItemsPosicion = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${URL}/posiciones/${id}/items`);
    dispatch(setItemsPosicion(response.data));
  } catch (error) {
    dispatch(setError(error.message));
    Swal.fire({
      title: "Error",
      text: "No se pudieron cargar los items de la posición",
      icon: "error"
    });
  } finally {
    dispatch(setLoading(false));
  }
};

export const enviarMovimiento = (selectedItem, data, id) => async (dispatch) => {
  try {
    const response = await axios.post(`${URL}/movimientos/interno`, {selectedItem, data, id});
    Swal.fire({
      title: "Éxito",
      text: "La mercadería se cambió de posición",
      icon: "success"
    });
    dispatch(fetchItemsPosicion(id));
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "No se pudo realizar el movimiento",
      icon: "error"
    });
  }
};

export const agregarAlRemitoSalida = (selectedItem, proveedor, kilos, unidades, id, fecha) => async (dispatch) => {
  try {
    await axios.post(`${URL}/movimientos/salida-desde-posicion`, {
      selectedItem,
      kilos: parseFloat(kilos),
      unidades: parseInt(unidades),
      id,
      proveedor,
      fecha
    });
    
    Swal.fire({
      title: "Éxito",
      text: "La mercadería se agregó al remito de salida",
      icon: "success"
    });
    
    dispatch(fetchItemsPosicion(id));
  } catch (error) {
    console.error("Error agregando al remito de salida:", error);
    Swal.fire({
      title: "Error",
      text: "No se pudo agregar la mercadería al remito",
      icon: "error"
    });
  }
};

export const adicionRapida = (adicion) => async (dispatch) => {
  try {
    console.log('Enviando datos a adicionRapida:', adicion);
    const response = await axios.post(`${URL}/movimientos/adicion-rapida`, adicion);
    
    // Mostrar mensaje según el tipo de movimiento
    const mensaje = adicion.tipoMovimiento === 'ajusteRESTA' 
      ? 'La mercadería se eliminó correctamente'
      : 'La mercadería se agregó correctamente';
      
    Swal.fire({
      title: "Éxito",
      text: mensaje,
      icon: "success"
    });
    // Recargar las posiciones después de una operación exitosa
    dispatch(fetchPosiciones());
  } catch (error) {
    console.error('Error en adición rápida:', error);
    console.error('Respuesta del servidor:', error.response?.data);
    
    const errorMessage = error.response?.data?.message || 
                        error.response?.data || 
                        "No se pudo realizar la operación";
    
    Swal.fire({
      title: "Error",
      text: errorMessage,
      icon: "error"
    });
  }
};

export const actualizarKilosUnidades = (selectedItem, data, id) => async (dispatch) => {
  try {
    await axios.put(`${URL}/posiciones/${id}/items/${selectedItem.id}`, data);
    dispatch(fetchItemsPosicion(id));
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "No se pudo actualizar la cantidad",
      icon: "error"
    });
  }
};

export default posicionSlice.reducer; 