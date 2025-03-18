import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { fetchItemsPosicion } from '../../../features/posicion/model/slice';
import { fetchPosiciones } from '../../posicion/model/slice';

const URL = "https://derwill-deposito-backend.onrender.com";

const initialState = {
  proveedores: [],
  items: [],
  remitos: [],
  partidasRemitoEntrada: [],
  loading: false,
  error: null,
  formData: {
    proveedor: '',
    fecha: '',
    numeroRemito: ''
  }
};

const remitosSlice = createSlice({
  name: 'remitos',
  initialState,
  reducers: {
    setProveedores: (state, action) => {
      state.proveedores = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setRemitos: (state, action) => {
      state.remitos = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addPartidaRemitoEntrada: (state, action) => {
      state.partidasRemitoEntrada.push(action.payload);
    },
    removePartidaRemitoEntrada: (state, action) => {
      state.partidasRemitoEntrada = state.partidasRemitoEntrada.filter(
        (_, index) => index !== action.payload
      );
    },
    updatePartidaRemitoEntrada: (state, action) => {
      const { index, partida } = action.payload;
      state.partidasRemitoEntrada[index] = partida;
    },
    clearPartidasRemitoEntrada: (state) => {
      state.partidasRemitoEntrada = [];
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    }
  }
});

export const { 
  setProveedores, 
  setItems, 
  setRemitos, 
  setLoading, 
  setError,
  addPartidaRemitoEntrada,
  removePartidaRemitoEntrada,
  updatePartidaRemitoEntrada,
  clearPartidasRemitoEntrada,
  setFormData
} = remitosSlice.actions;

export const dataProveedoresItems = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${URL}/remitos/dataload-remito-recepcion`);
    
    if (!response.data.proveedores) {
      throw new Error('Formato de respuesta inválido');
    }

    dispatch(setProveedores(response.data.proveedores));
    dispatch(setItems(response.data.items));
  } catch (error) {
    dispatch(setError('Error al cargar los proveedores'));
    Swal.fire({
      title: "Error",
      text: "No se pudieron cargar los proveedores",
      icon: "error"
    });
  } finally {
    dispatch(setLoading(false));
  }
};

export const subirRemitoEntrada = ({formData, partidas}) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const remito = {
      proveedorSeleccionado: formData.proveedor,
      fechaSeleccionado: formData.fecha,
      numeroRemitoSeleccionado: formData.numeroRemito,
      partidasRemito: partidas,
      tipoMovimiento: "remitoEntrada",
    };

    console.log('Enviando remito:', remito);

    await axios.post(`${URL}/movimientos/remito-entrada`, remito);
    
    Swal.fire({
      title: "Éxito",
      text: "El remito se subió correctamente",
      icon: "success"
    });

    dispatch(clearPartidasRemitoEntrada());
    dispatch(setFormData({ proveedor: '', fecha: '', numeroRemito: '' }));
    
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "No se pudo subir el remito",
      icon: "error"
    });
  } finally {
    dispatch(setLoading(false));
  }
};

export const agregarAlRemitoSalida = (selectedItem, proveedor, kilos, unidades, id, fecha, onSuccess) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axios.post(`${URL}/movimientos/salida-desde-posicion`, {
      selectedItem,
      kilos: parseFloat(kilos),
      unidades: parseInt(unidades),
      id,
      proveedor,
      fecha
    });
    
    Swal.fire({
      title: "Éxito",
      text: "La mercadería se agregó al remito de salida",
      icon: "success"
    });
    
    dispatch(fetchPosiciones());
    
    if (onSuccess) onSuccess();
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "No se pudo agregar la mercadería al remito",
      icon: "error"
    });
  } finally {
    dispatch(setLoading(false));
  }
};

export default remitosSlice.reducer; 