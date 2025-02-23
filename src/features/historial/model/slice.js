import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = "https://derwill-deposito-backend.onrender.com";

/** @type {import('./types').HistorialState} */
const initialState = {
  historialSalida: [],
  loading: false,
  error: null
};

// Función para convertir YYYY-MM-DD a DD-MM-YYYY (solo para visualización)
const convertirFecha = (fecha) => {
  const [year, month, day] = fecha.split('-');
  return `${day}-${month}-${year}`;
};

// Función auxiliar para ordenar por fecha
const sortByDate = (a, b) => {
  // Comparamos directamente las fechas en formato YYYY-MM-DD
  // Esto funciona porque es un formato que se puede comparar como string
  if (a.fecha > b.fecha) return 1;  // a es más reciente, va después
  if (a.fecha < b.fecha) return -1; // b es más reciente, va antes
  return 0; // son iguales
};

export const fetchHistorialSalida = createAsyncThunk(
  'historial/fetchHistorialSalida',
  async () => {
    const response = await axios.get(`${URL}/movimientos/salida`);
    
    // Primero ordenamos con el formato original
    const sortedData = response.data.sort(sortByDate);
    
    // Luego convertimos el formato para visualización
    return sortedData.map(remito => ({
      ...remito,
      fechaOriginal: remito.fecha, // Mantenemos la fecha original para ordenamiento
      fecha: convertirFecha(remito.fecha) // Fecha formateada para visualización
    }));
  }
);

const historialSlice = createSlice({
  name: 'historial',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistorialSalida.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistorialSalida.fulfilled, (state, action) => {
        state.loading = false;
        state.historialSalida = action.payload;
      })
      .addCase(fetchHistorialSalida.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default historialSlice.reducer; 