import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const produccionService = {
  createProducciones: async (producciones) => {
    try {
      // Primero creamos los movimientos de tipo 'producido' para cada producción
      const movimientosPromises = producciones.map(produccion => {
        const movimientoData = {
          numeroPO: produccion.numeroPO,
          articulos: [{
            codigoArticulo: produccion.articulo.codigoArticulo,
            talle: produccion.articulo.talle,
            cantidad: produccion.cantidad
          }],
          tipoMovimientoArticulo: 'producido',
          fecha: new Date().toISOString().split('T')[0]
        };
        return axios.post(`${API_URL}/movimientos_articulos`, movimientoData);
      });

      // Esperamos a que se creen todos los movimientos
      await Promise.all(movimientosPromises);

      // Luego creamos las producciones
      const response = await axios.post(`${API_URL}/producciones`, {
        producciones: producciones.map(produccion => ({
          articuloId: produccion.articulo.id,
          cantidad: produccion.cantidad,
          numeroLoteProduccion: produccion.numeroLoteProduccion,
          numeroPO: produccion.numeroPO
        }))
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear las producciones');
    }
  },

  getProduccionesByFecha: async (fecha) => {
    try {
      const response = await axios.get(`${API_URL}/producciones/fecha/${fecha}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener las producciones');
    }
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