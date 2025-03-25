import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const URL = "https://derwill-deposito-backend.onrender.com";

export const fetchClientes = createAsyncThunk(
  'ordenPedido/fetchClientes',
  async () => {
    const response = await fetch(`${URL}/clientes`);
    if (!response.ok) {
      throw new Error('Error al obtener los clientes');
    }
    const data = await response.json();
    return data;
  }
);

export const crearNuevoCliente = createAsyncThunk(
  'ordenPedido/crearNuevoCliente',
  async (cliente) => {
    const response = await fetch(`${URL}/clientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    });
    if (!response.ok) {
      throw new Error('Error al crear el cliente');
    }
    const data = await response.json();
    return data;
  }
);

export const crearArticulo = createAsyncThunk(
  'ordenPedido/crearArticulo',
  async (articulo) => {
    const response = await fetch(`${URL}/articulos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articulo),
    });
    if (!response.ok) {
      throw new Error('Error al crear el artículo');
    }
    const data = await response.json();
    return data;
  }
);

export const agregarArticulo = createAsyncThunk(
  'ordenPedido/agregarArticulo',
  async (articulo) => {
    return articulo;
  }
);

export const agregarPedido = createAsyncThunk(
  'ordenPedido/agregarPedido',
  async (pedido) => {
    const response = await fetch(`${URL}/movimientos-articulo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        numeroPO: pedido.numeroPO,
        cliente: { id: pedido.clienteId },
        articulo: { id: pedido.detalles[0].articuloId },
        cantidadArticulos: pedido.detalles[0].cantidad,
        fecha: pedido.fecha,
        tipoMovimientoArticulo: 'pedido'
      }),
    });
    if (!response.ok) {
      throw new Error('Error al crear el pedido');
    }
    const data = await response.json();
    return data;
  }
);

const initialState = {
  clientes: [],
  clienteSeleccionado: null,
  articulosPedido: [],
  loading: false,
  error: null,
};

const ordenPedidoSlice = createSlice({
  name: 'ordenPedido',
  initialState,
  reducers: {
    setClienteSeleccionado: (state, action) => {
      state.clienteSeleccionado = action.payload;
    },
    eliminarArticulo: (state, action) => {
      state.articulosPedido = state.articulosPedido.filter(
        (articulo, index) => index !== action.payload
      );
    },
    clearPedido: (state) => {
      state.clienteSeleccionado = null;
      state.articulosPedido = [];
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
      // Crear Artículo
      .addCase(crearArticulo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(crearArticulo.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(crearArticulo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Agregar Artículo
      .addCase(agregarArticulo.fulfilled, (state, action) => {
        state.articulosPedido.push(action.payload);
      })
      // Agregar Pedido
      .addCase(agregarPedido.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(agregarPedido.fulfilled, (state) => {
        state.loading = false;
        state.clienteSeleccionado = null;
        state.articulosPedido = [];
      })
      .addCase(agregarPedido.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setClienteSeleccionado,
  eliminarArticulo,
  clearPedido,
} = ordenPedidoSlice.actions;

export default ordenPedidoSlice.reducer; 