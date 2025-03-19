import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { produccionService } from '../api/produccionService';

export const createProduccion = createAsyncThunk(
  'produccion/create',
  async (produccionData, { rejectWithValue }) => {
    try {
      const response = await produccionService.createProduccion(produccionData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al crear la producción');
    }
  }
);

export const subirProduccionDiaria = createAsyncThunk(
  'produccion/subirProduccionDiaria',
  async (producciones, { rejectWithValue }) => {
    try {
      const response = await produccionService.subirProduccionDiaria(producciones);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al subir la producción diaria');
    }
  }
);

export const getProduccionByFecha = createAsyncThunk(
  'produccion/getByFecha',
  async (fecha, { rejectWithValue }) => {
    try {
      const response = await produccionService.getProduccionByFecha(fecha);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al obtener la producción');
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  produccionDiaria: [],
  currentProduccion: null,
  produccionesTemporales: []
};

const produccionSlice = createSlice({
  name: 'produccion',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    addProduccionTemporal: (state, action) => {
      state.produccionesTemporales.push(action.payload);
    },
    removeProduccionTemporal: (state, action) => {
      state.produccionesTemporales = state.produccionesTemporales.filter(
        (_, index) => index !== action.payload
      );
    },
    clearProduccionesTemporales: (state) => {
      state.produccionesTemporales = [];
    },
    updateProduccionTemporal: (state, action) => {
      const { index, produccion } = action.payload;
      state.produccionesTemporales[index] = produccion;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduccion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduccion.fulfilled, (state, action) => {
        state.loading = false;
        state.produccionDiaria.unshift(action.payload);
        state.currentProduccion = action.payload;
      })
      .addCase(createProduccion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(subirProduccionDiaria.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subirProduccionDiaria.fulfilled, (state) => {
        state.loading = false;
        state.produccionesTemporales = [];
      })
      .addCase(subirProduccionDiaria.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProduccionByFecha.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduccionByFecha.fulfilled, (state, action) => {
        state.loading = false;
        state.produccionDiaria = action.payload;
      })
      .addCase(getProduccionByFecha.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { 
  clearError, 
  addProduccionTemporal, 
  removeProduccionTemporal, 
  clearProduccionesTemporales,
  updateProduccionTemporal 
} = produccionSlice.actions;

export default produccionSlice.reducer; 