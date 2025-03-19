import axios from 'axios';

const API_URL = "https://derwill-deposito-backend.onrender.com" || 'http://localhost:3001';

export const articulosService = {
  async getAllArticulos() {
    const response = await axios.get(`${API_URL}/articulos`);
    return response.data;
  },

  async getArticuloById(id) {
    const response = await axios.get(`${API_URL}/articulos/${id}`);
    return response.data;
  },

  createArticulo: async (articuloData) => {
    const response = await axios.post(`${API_URL}/articulos`, articuloData);
    return response.data;
  }
}; 