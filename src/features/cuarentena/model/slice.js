import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';

const URL = "https://derwill-deposito-backend.onrender.com";

/** @type {import('./types').CuarentenaState} */
const initialState = {
  partidas: [],
  filterState: null,
  filterText: null,
  loading: false,
  error: null
};

export const fetchPartidasCuarentena = createAsyncThunk(
  'cuarentena/fetchPartidas',
  async () => {
    const response = await axios.get(`${URL}/cuarentena`);
    return response.data;
  }
);

export const cambiarEstadoPartida = createAsyncThunk(
  'cuarentena/cambiarEstado',
  async ({ partidaId, nuevoEstado }) => {
    const response = await axios.put(`${URL}/partidas/cuarentena-stock`, { estado: nuevoEstado });
    return { partidaId, nuevoEstado };
  }
);

export const pasarPartidaAStock = createAsyncThunk(
  'cuarentena/pasarAStock',
  async (distribucion) => {
    const response = await axios.put(`${URL}/partidas/estado-partida`, distribucion);
    return response.data;
  }
);

export const agregarAlRemitoSalida = createAsyncThunk(
  'cuarentena/agregarAlRemitoSalida',
  async ({ item, proveedorId, kilos, unidades, partidaId, fecha }) => {
    const response = await axios.post(`${URL}/movimientos/remito-salida`, {
      item,
      proveedorId,
      kilos,
      unidades,
      partidaId,
      fecha
    });
    return response.data;
  }
);

const cuarentenaSlice = createSlice({
  name: 'cuarentena',
  initialState,
  reducers: {
    setFilterState: (state, action) => {
      state.filterState = action.payload;
    },
    setFilterText: (state, action) => {
      state.filterText = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartidasCuarentena.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPartidasCuarentena.fulfilled, (state, action) => {
        state.loading = false;
        state.partidas = action.payload;
      })
      .addCase(fetchPartidasCuarentena.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(cambiarEstadoPartida.fulfilled, (state, action) => {
        const { partidaId, nuevoEstado } = action.payload;
        if (nuevoEstado === 'rechazada') {
          state.partidas = state.partidas.filter(p => p.id !== partidaId);
        } else {
          state.partidas = state.partidas.map(p => 
            p.id === partidaId ? { ...p, estado: nuevoEstado } : p
          );
        }
      })
      .addCase(pasarPartidaAStock.fulfilled, (state, action) => {
        const partidaId = action.payload[0].partida.id;
        state.partidas = state.partidas.filter(p => p.id !== partidaId);
      });
  }
});

export const { setFilterState, setFilterText } = cuarentenaSlice.actions;

export default cuarentenaSlice.reducer; 