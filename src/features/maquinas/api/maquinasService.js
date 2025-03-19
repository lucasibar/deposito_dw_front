import axios from 'axios';

const API_URL = "https://derwill-deposito-backend.onrender.com" || 'http://localhost:3001';

export const maquinasService = {
  async getAllMaquinas() {
    const response = await axios.get(`${API_URL}/maquinas`);
    return response.data;
  },

  createMaquina: async (maquinaData) => {
    const response = await axios.post(`${API_URL}/maquinas`, maquinaData);
    return response.data;
  }
}; 