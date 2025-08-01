import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { partidasApi } from '../api/partidasApi';

export const fetchPartidasEnCuarentena = createAsyncThunk(
  'partidas/fetchPartidasEnCuarentena',
  async () => {
    return await partidasApi.getPartidasEnCuarentena();
  }
);

// Nuevo thunk para actualizar el estado de una partida
export const actualizarEstadoPartida = createAsyncThunk(
  'partidas/actualizarEstadoPartida',
  async ({ partidaId: id, nuevoEstado: estado }, { rejectWithValue }) => {
    try {
      console.log('Datos antes de enviar:', { id, estado }); // Para debug
      const response = await partidasApi.actualizarEstadoPartida(id, estado);
      console.log('Respuesta del servidor:', response); // Para debug
      return { 
        partidaId: id, 
        nuevoEstado: estado 
      };
    } catch (error) {
      console.error('Error completo:', error.response || error); // Para ver el error completo
      return rejectWithValue(error.response?.data?.message || 'Error al actualizar el estado de la partida');
    }
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
    },

    // Nuevo reducer para remover una partida
    removePartida: (state, action) => {
      state.partidas = state.partidas.filter(partida => partida.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartidasEnCuarentena.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPartidasEnCuarentena.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.partidas = action.payload.map(partida => {
          // Formatear la fecha
          const fechaOriginal = new Date(partida.fecha);
          const dia = fechaOriginal.getDate().toString().padStart(2, '0');
          const mes = (fechaOriginal.getMonth() + 1).toString().padStart(2, '0');
          const año = fechaOriginal.getFullYear();
          const fechaFormateada = `${dia}-${mes}-${año}`;

          return {
            id: partida.id, 
            numeroPartida: partida.numeroPartida,
            item: partida.item,
            descripcionItem: partida.item ? `${partida.item.descripcion || ''} ${partida.item.categoria || ''}`.trim() || "Sin descripción" : "Sin descripción",
            kilos: partida.kilos,
            unidades: partida.unidades,
            estado: partida.estado,
            proveedor: partida.item?.proveedor?.nombre || "Sin proveedor",
            fecha: fechaFormateada,
            fechaModificacion: null
          };
        });
      })
      .addCase(fetchPartidasEnCuarentena.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(actualizarEstadoPartida.fulfilled, (state, action) => {
        console.log(action.payload);
        const { partidaId, nuevoEstado } = action.payload;
        const partida = state.partidas.find(p => p.id === partidaId);
        if (partida) {
          partida.estado = nuevoEstado;
          partida.fechaModificacion = new Date().toISOString();
        }
      })
      .addCase(actualizarEstadoPartida.rejected, (state, action) => {
        state.error = 'Error al actualizar el estado de la partida';
      });
  }
});

export const { marcarPartidaRevisada, actualizarPartidas, removePartida } = partidasSlice.actions;
export default partidasSlice.reducer; 