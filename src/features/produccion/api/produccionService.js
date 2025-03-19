import axios from 'axios';

const API_URL = "https://derwill-deposito-backend.onrender.com";

export const produccionService = {
  createProduccion: async (produccionData) => {
    const response = await axios.post(`${API_URL}/produccion`, produccionData);
    return response.data;
  },

  subirProduccionDiaria: async (producciones) => {
    const response = await axios.post(`${API_URL}/produccion/bulk`, {
      producciones: producciones
    });
    return response.data;
  },

  getProduccionByFecha: async (fecha) => {
    const response = await axios.get(`${API_URL}/produccion/fecha/${fecha}`);
    return response.data;
  },

  getAllProduccion: async () => {
    const response = await axios.get(`${API_URL}/produccion`);
    return response.data;
  }
}; 