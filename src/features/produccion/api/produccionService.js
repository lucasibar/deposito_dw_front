import axios from 'axios';

const API_URL = "https://derwill-deposito-backend.onrender.com";

export const produccionService = {
  createProduccion: async (produccionData) => {
    const response = await axios.post(`${API_URL}/produccion`, produccionData);
    return response.data;
  },

  subirProduccionDiaria: async (producciones) => {
    // Asegurarse de que los IDs sean números
    const produccionesFormateadas = producciones.map(produccion => ({
      ...produccion,
      maquina: Number(produccion.maquina),
      legajo: Number(produccion.legajo),
      articulo: Number(produccion.articulo),
      unidades: Number(produccion.unidades)
    }));

    const response = await axios.post(`${API_URL}/produccion/bulk`, {
      producciones: produccionesFormateadas
    });
    return response.data;
  },

  getProduccionByFecha: async (fecha) => {
    const response = await axios.get(`${API_URL}/produccion/fecha/${fecha}`);
    return response.data;
  },

  getProduccionByLote: async (numeroLote) => {
    const response = await axios.get(`${API_URL}/produccion/lote/${numeroLote}`);
    return response.data;
  },

  getAllProduccion: async () => {
    const response = await axios.get(`${API_URL}/produccion`);
    return response.data;
  }
}; 