import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { movimientosArticulosService } from '../api/movimientosArticulosService';
import { MOVIMIENTO_ARTICULO_INITIAL_STATE } from './types';

// Thunks
export const fetchMovimientos = createAsyncThunk(
  'movimientosArticulos/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await movimientosArticulosService.getAllMovimientos();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createMovimiento = createAsyncThunk(
  'movimientosArticulos/create',
  async (movimiento, { rejectWithValue }) => {
    try {
      const response = await movimientosArticulosService.createMovimiento(movimiento);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const movimientosArticulosSlice = createSlice({
  name: 'movimientosArticulos',
  initialState: MOVIMIENTO_ARTICULO_INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Movimientos
      .addCase(fetchMovimientos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovimientos.fulfilled, (state, action) => {
        state.loading = false;
        state.movimientos = action.payload;
      })
      .addCase(fetchMovimientos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Movimiento
      .addCase(createMovimiento.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMovimiento.fulfilled, (state, action) => {
        state.loading = false;
        state.movimientos.push(action.payload);
      })
      .addCase(createMovimiento.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Selectors
export const selectMovimientos = (state) => state.movimientosArticulos.movimientos;
export const selectMovimientosLoading = (state) => state.movimientosArticulos.loading;
export const selectMovimientosError = (state) => state.movimientosArticulos.error;

// Helper function to calculate stock by numeroPO
export const calculateStockByPO = (movimientos) => {
  const stockByPO = {};
  
  movimientos.forEach(movimiento => {
    const { numeroPO, cantidadArticulos, tipoMovimientoArticulo, fecha } = movimiento;
    
    if (!stockByPO[numeroPO]) {
      stockByPO[numeroPO] = 0;
    }

    const currentDate = new Date();
    const movimientoDate = new Date(fecha);

    switch (tipoMovimientoArticulo) {
      case 'pedido':
        stockByPO[numeroPO] += cantidadArticulos;
        break;
      case 'producido':
        stockByPO[numeroPO] -= cantidadArticulos;
        break;
      case 'produccion':
        if (movimientoDate > currentDate) {
          stockByPO[numeroPO] -= cantidadArticulos;
        }
        break;
      default:
        break;
    }
  });

  return stockByPO;
};

export default movimientosArticulosSlice.reducer; 