import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const URL = "https://derwill-deposito-backend.onrender.com";

// Thunks
export const fetchClientes = createAsyncThunk(
  'ordenPedido/fetchClientes',
  async () => {
    const response = await fetch(`${URL}/clientes`);
    if (!response.ok) throw new Error('Error al obtener los clientes');
    return response.json();
  }
);

export const crearNuevoCliente = createAsyncThunk(
  'ordenPedido/crearNuevoCliente',
  async (cliente) => {
    const response = await fetch(`${URL}/clientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente),
    });
    if (!response.ok) throw new Error('Error al crear el cliente');
    return response.json();
  }
);

export const subirOrdenPedido = createAsyncThunk(
  'ordenPedido/agregarPedido',
  async (pedido) => {
    try {
      const bodyData = {
        numeroPO: pedido.orden.numeroPO,
        clienteId: pedido.orden.clienteId,
        fecha: pedido.orden.fecha,
        articulos: pedido.articulosPedido,
        tipoMovimientoArticulo: 'pedido'
      };

      const response = await fetch(`${URL}/movimientos_articulos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Error ${response.status}: ${errorData}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error completo:', error);
      throw error;
    }
  }
);

const initialState = {
  clientes: [],
  clienteSeleccionado: null,
  articulosPedido: [],
  orden: {
    numeroPO: '',
    fecha: new Date().toISOString().split('T')[0],
    clienteId: '',
  },
  loading: false,
  error: null,
  ui: {
    openDialogCliente: false,
    openDialogArticulo: false,
    snackbar: {
      open: false,
      message: '',
      severity: 'success'
    }
  }
};

const ordenPedidoSlice = createSlice({
  name: 'ordenPedido',
  initialState,
  reducers: {
    updateOrden: (state, action) => {
      state.orden = { ...state.orden, ...action.payload };
    },
    setClienteSeleccionado: (state, action) => {
      state.clienteSeleccionado = action.payload;
      state.orden.clienteId = action.payload.id;
    },
    agregarArticulo: (state, action) => {
      state.articulosPedido.push(action.payload);
      state.ui.openDialogArticulo = false;
    },
    eliminarArticulo: (state, action) => {
      state.articulosPedido = state.articulosPedido.filter(
        (_, index) => index !== action.payload
      );
    },
    setDialogCliente: (state, action) => {
      state.ui.openDialogCliente = action.payload;
    },
    setDialogArticulo: (state, action) => {
      state.ui.openDialogArticulo = action.payload;
    },
    setSnackbar: (state, action) => {
      state.ui.snackbar = { ...state.ui.snackbar, ...action.payload };
    },
    clearPedido: (state) => {
      state.clienteSeleccionado = null;
      state.articulosPedido = [];
      state.orden = initialState.orden;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Clientes
      .addCase(fetchClientes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientes.fulfilled, (state, action) => {
        state.loading = false;
        state.clientes = action.payload;
      })
      .addCase(fetchClientes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Crear Nuevo Cliente
      .addCase(crearNuevoCliente.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(crearNuevoCliente.fulfilled, (state, action) => {
        state.loading = false;
        state.clientes.push(action.payload);
        state.clienteSeleccionado = action.payload;
      })
      .addCase(crearNuevoCliente.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Agregar Pedido
      .addCase(subirOrdenPedido.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subirOrdenPedido.fulfilled, (state) => {
        state.loading = false;
        state.clienteSeleccionado = null;
        state.articulosPedido = [];
      })
      .addCase(subirOrdenPedido.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  updateOrden,
  setClienteSeleccionado,
  agregarArticulo,
  eliminarArticulo,
  setDialogCliente,
  setDialogArticulo,
  setSnackbar,
  clearPedido,
} = ordenPedidoSlice.actions;

export default ordenPedidoSlice.reducer; 