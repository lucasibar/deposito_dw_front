import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const URL = process.env.REACT_APP_API_URL;
const URL = "http:/localhost:3000/deposito_dw_front";

// Async thunks
export const fetchPosiciones = createAsyncThunk(
  'posiciones/fetchPosiciones',
  async () => {
    const response = await axios.get(`${URL}/posiciones`);
    return response.data;
  }
);

export const createPosicion = createAsyncThunk(
  'posiciones2/createPosicion',
  async (posicionData) => {
    const response = await axios.post(`${URL}/posiciones`, posicionData);
    return response.data;
  }
);

export const updatePosicion = createAsyncThunk(
  'posiciones2/updatePosicion',
  async ({ id, posicionData }) => {
    const response = await axios.put(`${URL}/posiciones/${id}`, posicionData);
    return response.data;
  }
);

export const deletePosicion = createAsyncThunk(
  'posiciones2/deletePosicion',
  async (id) => {
    await axios.delete(`${URL}/posiciones/${id}`);
    return id;
  }
);

const initialState = {
  posiciones: [],
  loading: false,
  error: null
};

const posicionesSlice = createSlice({
  name: 'posiciones2',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch posiciones
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
      // Create posicion
      .addCase(createPosicion.fulfilled, (state, action) => {
        state.posiciones.push(action.payload);
      })
      // Update posicion
      .addCase(updatePosicion.fulfilled, (state, action) => {
        const index = state.posiciones.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.posiciones[index] = action.payload;
        }
      })
      // Delete posicion
      .addCase(deletePosicion.fulfilled, (state, action) => {
        state.posiciones = state.posiciones.filter(p => p.id !== action.payload);
      });
  }
});

export const { clearError } = posicionesSlice.actions;
export default posicionesSlice.reducer; 