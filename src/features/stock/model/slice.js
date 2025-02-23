import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = "https://derwill-deposito-backend.onrender.com";

const initialState = {
  posiciones: [],
  loading: false,
  error: null
};

export const fetchPosiciones = createAsyncThunk(
  'stock/fetchPosiciones',
  async () => {
    const response = await axios.get(`${URL}/posiciones/items`);
    return response.data;
  }
);

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  }
});

export default stockSlice.reducer; 