import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const movimientosArticulosService = {
  getAllMovimientos: async () => {
    const response = await axios.get(`${API_URL}/movimientos-articulos`);
    return response.data;
  },

  createMovimiento: async (movimiento) => {
    const response = await axios.post(`${API_URL}/movimientos-articulos`, movimiento);
    return response.data;
  },

  updateMovimiento: async (id, movimiento) => {
    const response = await axios.put(`${API_URL}/movimientos-articulos/${id}`, movimiento);
    return response.data;
  },

  deleteMovimiento: async (id) => {
    const response = await axios.delete(`${API_URL}/movimientos-articulos/${id}`);
    return response.data;
  }
}; 