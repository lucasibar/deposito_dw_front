import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchArticulos = createAsyncThunk(
  'articulos/fetchArticulos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://derwill-deposito-backend.onrender.com/articulos/clasificados');
      console.log('API Response:', response.data); // Para debug
      return response.data;
    } catch (error) {
      console.error('API Error:', error); // Para debug
      return rejectWithValue(error.message);
    }
  }
); 