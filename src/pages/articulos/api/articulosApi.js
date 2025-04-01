import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchArticulos = createAsyncThunk(
  'articulos/fetchArticulos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://derwill-deposito-backend.onrender.com/articulos');      
      if (!Array.isArray(response.data)) {
        throw new Error('La respuesta no es un array');
      }
      return response.data;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message); // Logging más detallado
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Error desconocido'
      );
    }
  }
);

export const addYarnComposition = createAsyncThunk(
  'articulos/addYarnComposition',
  async ({ articuloId, composicion }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://derwill-deposito-backend.onrender.com/articulos/${articuloId}/composicion`,
        { composicion }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Error al agregar la composición'
      );
    }
  }
);

export const updateOrCreateComposiciones = createAsyncThunk(
  'articulos/updateOrCreateComposiciones',
  async (composiciones, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://derwill-deposito-backend.onrender.com/composicion-hilado/update-or-create',
        composiciones
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Error al actualizar las composiciones'
      );
    }
  }
);