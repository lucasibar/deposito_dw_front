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
      
      // Transformar los datos al formato esperado
      const articulosOrganizados = {
        articulosSinComposicion: response.data.filter(articulo => !articulo.composicion),
        articulosConComposicion: response.data.filter(articulo => articulo.composicion),
        articulosInactivos: response.data.filter(articulo => !articulo.activo)
      };
      
      return articulosOrganizados;
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