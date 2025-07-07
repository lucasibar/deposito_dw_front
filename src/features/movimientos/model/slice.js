import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { fetchItemsPosicion } from '../../../features/posicion/model/slice';
import { fetchPosiciones } from '../../../features/posicion/model/slice';
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
    const payload = {
      selectedItem: {
        itemId: selectedItem.itemId,
        categoria: selectedItem.categoria,
        descripcion: selectedItem.descripcion,
        proveedor: selectedItem.proveedor,
        partida: selectedItem.partida,
        kilos: selectedItem.kilos,
        unidades: selectedItem.unidades
      },
      data,
      id
    };

    const response = await axios.post(`${URL}/movimientos/interno`, payload);
    
    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        title: "Éxito",
        text: response.data.message || "La mercadería se cambió de posición correctamente",
        icon: "success"
      });
      await dispatch(fetchPosiciones());
      if (onSuccess) onSuccess();
    }
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: error.response?.data?.message || "No se pudo realizar el movimiento",
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
    // Recargar las posiciones después de una adición exitosa
    dispatch(fetchPosiciones());
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