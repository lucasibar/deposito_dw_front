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
    const response = await axios.post(`${URL}/movimientos/adicion-rapida`, adicion);
    Swal.fire({
      title: "Éxito",
      text: "La mercadería se agregó correctamente",
      icon: "success"
    });
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "No se pudo realizar la adición",
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