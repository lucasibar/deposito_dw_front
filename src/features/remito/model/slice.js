import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';

const URL = "https://derwill-deposito-backend.onrender.com";

/** @type {import('./types').RemitoState} */
const initialState = {
  items: [],
  proveedores: [],
  selectedProveedor: null,
  selectedFecha: '',
  numeroRemito: '',
  partidasRemito: [],
  loading: false,
  error: null
};

export const fetchProveedores = createAsyncThunk(
  'remito/fetchProveedores',
  async () => {
    const response = await axios.get(`${URL}/proveedores`);
    return response.data;
  }
);

export const fetchItems = createAsyncThunk(
  'remito/fetchItems',
  async () => {
    const response = await axios.get(`${URL}/items`);
    return response.data;
  }
);

export const agregarAlRemitoSalida = createAsyncThunk(
  'remito/agregarSalida',
  async ({ item, proveedorId, kilos, unidades, posicionId, fecha }) => {
    const response = await axios.post(`${URL}/remito/salida`, {
      item,
      proveedorId,
      kilos,
      unidades,
      posicionId,
      fecha
    });
    return response.data;
  }
);

export const agregarPartida = createAsyncThunk(
  'remito/agregarPartida',
  async (remito) => {
    try {
      const response = await axios.post(`${URL}/movimientos/remito-entrada`, remito);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Se cargo correctamente el remito",
        showConfirmButton: false,
        timer: 1500
      });
      return response.data;
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo cargar el remito",
        icon: "error"
      });
      throw error;
    }
  }
);

export const generarNuevoProveedor = createAsyncThunk(
  'remito/generarNuevoProveedor',
  async (proveedor) => {
    try {
      const response = await axios.post(`${URL}/proveedores`, proveedor);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Se creó el proveedor correctamente",
        showConfirmButton: false,
        timer: 1500
      });
      return response.data;
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo crear el proveedor",
        icon: "error"
      });
      throw error;
    }
  }
);

const remitoSlice = createSlice({
  name: 'remito',
  initialState,
  reducers: {
    setProveedor: (state, action) => {
      state.selectedProveedor = action.payload;
    },
    setFecha: (state, action) => {
      state.selectedFecha = action.payload;
    },
    setNumeroRemito: (state, action) => {
      state.numeroRemito = action.payload;
    },
    agregarPartidaAlRemito: (state, action) => {
      state.partidasRemito.push(action.payload);
    },
    eliminarPartidaDelRemito: (state, action) => {
      state.partidasRemito = state.partidasRemito.filter(
        partida => partida.numeroPartida !== action.payload
      );
    },
    limpiarRemito: (state) => {
      state.partidasRemito = [];
      state.selectedProveedor = null;
      state.selectedFecha = '';
      state.numeroRemito = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProveedores.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProveedores.fulfilled, (state, action) => {
        state.loading = false;
        state.proveedores = action.payload;
      })
      .addCase(fetchProveedores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(agregarAlRemitoSalida.fulfilled, (state, action) => {
        // Actualizar el estado después de agregar al remito si es necesario
      })
      .addCase(agregarPartida.fulfilled, (state) => {
        state.partidasRemito = [];
        state.selectedProveedor = null;
        state.selectedFecha = '';
        state.numeroRemito = '';
      })
      .addCase(generarNuevoProveedor.fulfilled, (state, action) => {
        state.proveedores.push(action.payload);
      });
  }
});

export const { 
  setProveedor, 
  setFecha, 
  setNumeroRemito, 
  agregarPartidaAlRemito,
  eliminarPartidaDelRemito,
  limpiarRemito 
} = remitoSlice.actions;

export default remitoSlice.reducer; 