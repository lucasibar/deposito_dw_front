import axios from 'axios';
import { API_BASE_URL } from '../../../shared/config';

const URL = "https://derwill-deposito-backend.onrender.com";

export const partidasApi = {
  getPartidasEnCuarentena: async () => {
    const response = await axios.get(`${API_BASE_URL}/partidas/cuarentena`);
    return response.data;
  },

  actualizarEstadoPartida: async (id, estado) => {
    console.log('Enviando al servidor:', { id, estado }); // Para debug
    const response = await axios.put(`${URL}/partidas/estado-partida`, {
      id: id.toString(), // Asegurarnos que id sea string
      estado: estado.toLowerCase() // Asegurarnos que el estado esté en minúsculas
    });
    return response.data; // Ahora sí queremos la respuesta para debug
  }
}; 