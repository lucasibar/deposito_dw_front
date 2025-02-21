import axios from 'axios';
import { API_BASE_URL } from '../../../shared/config';

export const partidasApi = {
  getPartidasEnCuarentena: async () => {
    const response = await axios.get(`${API_BASE_URL}/partidas/cuarentena`);
    return response.data;
  }
}; 