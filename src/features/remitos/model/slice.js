import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { fetchItemsPosicion } from '../../../features/posicion/model/slice';

const URL = "https://derwill-deposito-backend.onrender.com";

const initialState = {
  proveedores: [],
  remitos: [],
  loading: false,
  error: null
};

const remitosSlice = createSlice({
  name: 'remitos',
  initialState,
  reducers: {
    setProveedores: (state, action) => {
      state.proveedores = action.payload;
    },
    setRemitos: (state, action) => {
      state.remitos = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setProveedores, setRemitos, setLoading, setError } = remitosSlice.actions;

// Thunks
export const dataProveedoresItems = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${URL}/remitos/dataload-remito-recepcion`);
    dispatch(setProveedores(response.data));
  } catch (error) {
    console.error("Error cargando proveedores:", error);
    Swal.fire({
      title: "Error",
      text: "No se pudieron cargar los proveedores",
      icon: "error"
    });
  } finally {
    dispatch(setLoading(false));
  }
};

export const agregarAlRemitoSalida = (selectedItem, proveedor, kilos, unidades, id, fecha, onSuccess) => async (dispatch) => {
  dispatch(setLoading(true));
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
    if (onSuccess) onSuccess();
  } catch (error) {
    console.error("Error agregando al remito de salida:", error);
    Swal.fire({
      title: "Error",
      text: "No se pudo agregar la mercadería al remito",
      icon: "error"
    });
  } finally {
    dispatch(setLoading(false));
  }
};

export default remitosSlice.reducer; 