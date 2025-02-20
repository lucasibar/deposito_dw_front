import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = "https://derwill-deposito-backend.onrender.com";

/** @type {import('./types').PosicionState} */
const initialState = {
  items: [],
  loading: false,
  error: null
};

export const fetchPosiciones = createAsyncThunk(
  'posicion/fetchPosiciones',
  async () => {
    try {
      const response = await axios.get(`${URL}/posiciones/items`);
      return response.data;
    } catch (error) {
      console.error("Error fetching posiciones:", error);
      throw error;
    }
  }
);

export const obtenerItemsPorPosicion = createAsyncThunk(
  'posicion/obtenerItemsPorPosicion',
  async (id) => {
    try {
      const response = await axios.get(`${URL}/posiciones/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching items por posición:", error);
      throw error;
    }
  }
);

const posicionSlice = createSlice({
  name: 'posicion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchPosiciones
      .addCase(fetchPosiciones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosiciones.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosiciones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // obtenerItemsPorPosicion
      .addCase(obtenerItemsPorPosicion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(obtenerItemsPorPosicion.fulfilled, (state, action) => {
        state.loading = false;
        const posicionId = action.meta.arg;
        const posicionIndex = state.items.findIndex(p => p.posicionId === posicionId);
        if (posicionIndex !== -1) {
          state.items[posicionIndex].items = action.payload;
        }
      })
      .addCase(obtenerItemsPorPosicion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default posicionSlice.reducer; 