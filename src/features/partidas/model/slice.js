import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { partidasApi } from '../api/partidasApi';

export const fetchPartidasEnCuarentena = createAsyncThunk(
  'partidas/fetchPartidasEnCuarentena',
  async () => {
    return await partidasApi.getPartidasEnCuarentena();
  }
);

const initialState = {
  partidas: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const partidasSlice = createSlice({
  name: 'partidas',
  initialState,
  reducers: {
    // Reducer para marcar una partida como revisada
    marcarPartidaRevisada: (state, action) => {
      const partidaId = action.payload;
      const partida = state.partidas.find(p => p.id === partidaId);
      if (partida) {
        partida.revisada = true;
        partida.fechaRevision = new Date().toISOString();
      }
    },
    
    // Reducer para transformar datos antes de guardarlos
    actualizarPartidas: (state, action) => {
      const nuevasPartidas = action.payload.map(partida => ({
        ...partida,
        estado: partida.estado.toUpperCase(),
        fechaIngreso: new Date(partida.fechaIngreso).toLocaleDateString(),
        revisada: false
      }));
      state.partidas = nuevasPartidas;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartidasEnCuarentena.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPartidasEnCuarentena.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Transformamos los datos antes de guardarlos
        state.partidas = action.payload.map(partida => ({
          id: partida.id, 
          numeroPartida: partida.numeroPartida,
          descripcionItem: `${partida.item.descripcion} ${partida.item.categoria}`||"QUE PASO?!",
          kilos: partida.kilos,
          unidades: partida.unidades,
          estado: partida.estado,
          proveedor: partida.item.proveedor.nombre,
          fecha: new Date(partida.fechaIngreso).toLocaleDateString(),
          fechaModificacion: null
        }));
      })
      .addCase(fetchPartidasEnCuarentena.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default partidasSlice.reducer; 