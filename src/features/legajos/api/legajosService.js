import axios from 'axios';

const API_URL = "https://derwill-deposito-backend.onrender.com" || 'http://localhost:3001';

export const legajosService = {
  async getAllLegajos() {
    const response = await axios.get(`${API_URL}/legajos`);
    return response.data;
  },

  createLegajo: async (legajoData) => {
    const response = await axios.post(`${API_URL}/legajos`, legajoData);
    return response.data;
  }
}; 