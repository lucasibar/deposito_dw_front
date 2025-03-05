import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = "https://derwill-deposito-backend.onrender.com";

/** @type {import('./types').PosicionState} */
const initialState = {
  posiciones: [],
  loading: false,
  error: null
};

export const fetchPosiciones = createAsyncThunk(
  'posiciones/fetchPosiciones',
  async () => {
    const response = await axios.get(`${URL}/posiciones/items`);
    return response.data;
  }
);

export const fetchItemsPosicion = createAsyncThunk(
  'posicion/fetchItems',
  async (posicionId) => {
    const response = await axios.get(`${URL}/posicion/${posicionId}`);
    return response.data.items || [];
  }
);

export const enviarMovimiento = createAsyncThunk(
  'posicion/enviarMovimiento',
  async ({ item, data, posicionId }) => {
    const response = await axios.post(`${URL}/movimientos/interno`, {
      item,
      ...data,
      posicionId
    });
    return response.data;
  }
);

export const actualizarKilosUnidades = createAsyncThunk(
  'posicion/actualizarKilosUnidades',
  async ({ itemId, kilos, unidades }) => {
    const response = await axios.put(`${URL}/items/${itemId}`, {
      kilos,
      unidades
    });
    return response.data;
  }
);

export const adicionRapida = createAsyncThunk(
  'posicion/adicionRapida',
  async (devolucionData) => {
    const response = await axios.post(`${URL}/movimientos/devolucion`, devolucionData);
    return response.data;
  }
);

const posicionSlice = createSlice({
  name: 'posicion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosiciones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosiciones.fulfilled, (state, action) => {
        state.loading = false;
        state.posiciones = action.payload;
      })
      .addCase(fetchPosiciones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchItemsPosicion.pending, (state) => {
        state.loading = true;
      })


      
      .addCase(fetchItemsPosicion.fulfilled, (state, action) => {
        state.loading = false;
        // Actualizar los items de una posición específica
        const posicionIndex = state.posiciones.findIndex(p => p.id === action.meta.arg);
        if (posicionIndex !== -1) {
          state.posiciones[posicionIndex].items = action.payload;
        }
      })
      .addCase(fetchItemsPosicion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(enviarMovimiento.fulfilled, (state, action) => {
        // Actualizar el item en la posición correspondiente
        const { posicionId } = action.meta.arg;
        const posicionIndex = state.posiciones.findIndex(p => p.id === posicionId);
        if (posicionIndex !== -1) {
          const itemIndex = state.posiciones[posicionIndex].items.findIndex(
            item => item.id === action.payload.id
          );
          if (itemIndex !== -1) {
            state.posiciones[posicionIndex].items[itemIndex] = action.payload;
          }
        }
      })
      .addCase(actualizarKilosUnidades.fulfilled, (state, action) => {
        // Actualizar el item en todas las posiciones donde aparezca
        state.posiciones = state.posiciones.map(posicion => ({
          ...posicion,
          items: posicion.items.map(item =>
            item.id === action.payload.id ? action.payload : item
          )
        }));
      })
      .addCase(adicionRapida.fulfilled, (state, action) => {
        // Agregar el nuevo item a la posición correspondiente
        const posicionIndex = state.posiciones.findIndex(p => p.id === action.payload.posicionId);
        if (posicionIndex !== -1) {
          state.posiciones[posicionIndex].items.push(action.payload);
        }
      });
  }
});

export default posicionSlice.reducer; 