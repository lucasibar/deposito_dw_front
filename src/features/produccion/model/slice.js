import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { produccionService } from '../api/produccionService';
import { TIPOS_MOVIMIENTO } from '../../movimientos_articulos/model/types';

export const createProducciones = createAsyncThunk(
  'produccion/createProducciones',
  async (producciones, { rejectWithValue }) => {
    try {
      const response = await produccionService.createProducciones(producciones);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
  produccionesTemporales: [],
  loading: false,
  error: null,
  produccionDiaria: [],
  currentProduccion: null
};

const produccionSlice = createSlice({
  name: 'produccion',
  initialState,
  reducers: {
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProducciones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProducciones.fulfilled, (state) => {
        state.loading = false;
        state.produccionesTemporales = [];
      })
      .addCase(createProducciones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
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
  addProduccionTemporal,
  removeProduccionTemporal,
  clearProduccionesTemporales,
  setLoading,
  setError
} = produccionSlice.actions;

// Selectors
export const selectProduccionesTemporales = (state) => state.produccion.produccionesTemporales;
export const selectProduccionLoading = (state) => state.produccion.loading;
export const selectProduccionError = (state) => state.produccion.error;

export default produccionSlice.reducer; 