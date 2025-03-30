import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchArticulos = createAsyncThunk(
  'articulos/fetchArticulos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://derwill-deposito-backend.onrender.com/articulos/clasificados');
      console.log('API Response:', response.data); // Para debug
      
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