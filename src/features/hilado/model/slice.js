import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';

const URL = "https://derwill-deposito-backend.onrender.com";

/** @type {import('./types').HiladoState} */
const initialState = {
  items: [],
  loading: false,
  error: null,
  filters: {
    searchText: '',
    rack: '',
    fila: '',
    pasillo: ''
  }
};

export const fetchHilados = createAsyncThunk(
  'hilado/fetchHilados',
  async (proveedorId) => {
    try {
      const response = await axios.get(`${URL}/items/${proveedorId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching hilados:", error);
      throw error;
    }
  }
);

export const agregarHilado = createAsyncThunk(
  'hilado/agregarHilado',
  async (nuevoItem) => {
    try {
      const response = await axios.post(`${URL}/items`, nuevoItem);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Se generó el item",
        showConfirmButton: false,
      });
      return response.data;
    } catch (error) {
      Swal.fire({
        title: "No se pudo crear el item",
        icon: "error"
      });
      throw error;
    }
  }
);

const hiladoSlice = createSlice({
  name: 'hilado',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchHilados
      .addCase(fetchHilados.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHilados.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchHilados.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // agregarHilado
      .addCase(agregarHilado.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  }
});

export const { setFilters } = hiladoSlice.actions;
export default hiladoSlice.reducer; 