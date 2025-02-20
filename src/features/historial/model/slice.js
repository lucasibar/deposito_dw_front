import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = "https://derwill-deposito-backend.onrender.com";

/** @type {import('./types').HistorialState} */
const initialState = {
  movimientos: [],
  loading: false,
  error: null
};

export const fetchMovimientosSalida = createAsyncThunk(
  'historial/fetchMovimientosSalida',
  async () => {
    const response = await axios.get(`${URL}/movimientos/salida`);
    return response.data;
  }
);

const historialSlice = createSlice({
  name: 'historial',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovimientosSalida.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovimientosSalida.fulfilled, (state, action) => {
        state.loading = false;
        state.movimientos = action.payload;
      })
      .addCase(fetchMovimientosSalida.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default historialSlice.reducer; 