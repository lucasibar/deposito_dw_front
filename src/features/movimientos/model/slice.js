import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { fetchItemsPosicion } from '../../../features/posicion/model/slice';

const URL = "https://derwill-deposito-backend.onrender.com";

const initialState = {
  loading: false,
  error: null
};

const movimientosSlice = createSlice({
  name: 'movimientos',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setLoading, setError } = movimientosSlice.actions;

// Thunks
export const enviarMovimiento = (selectedItem, data, id, onSuccess) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(`${URL}/movimientos/interno`, {selectedItem, data, id});
    Swal.fire({
      title: "Éxito",
      text: "La mercadería se cambió de posición",
      icon: "success"
    });
    dispatch(fetchItemsPosicion(id));
    if (onSuccess) onSuccess();
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "No se pudo realizar el movimiento",
      icon: "error"
    });
  } finally {
    dispatch(setLoading(false));
  }
};

export const adicionRapida = (adicion, onSuccess) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(`${URL}/movimientos/adicion-rapida`, adicion);
    Swal.fire({
      title: "Éxito",
      text: "La mercadería se agregó correctamente",
      icon: "success"
    });
    if (onSuccess) onSuccess();
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "No se pudo realizar la adición",
      icon: "error"
    });
  } finally {
    dispatch(setLoading(false));
  }
};

export const actualizarKilosUnidades = (selectedItem, data, id, onSuccess) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axios.put(`${URL}/posiciones/${id}/items/${selectedItem.id}`, data);
    dispatch(fetchItemsPosicion(id));
    if (onSuccess) onSuccess();
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "No se pudo actualizar la cantidad",
      icon: "error"
    });
  } finally {
    dispatch(setLoading(false));
  }
};

export default movimientosSlice.reducer; 