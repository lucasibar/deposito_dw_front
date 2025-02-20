/**
 * @typedef {Object} Posicion
 * @property {number} posicionId - ID único de la posición
 * @property {number} rack - Número de rack
 * @property {number} fila - Número de fila
 * @property {number} pasillo - Número de pasillo
 * @property {string} AB - Identificador de piso/altura
 * @property {boolean} entrada - Indica si es una posición de entrada
 * @property {import('../../hilado/model/types').Hilado[]} items - Hilados en esta posición
 */

/**
 * @typedef {Object} PosicionState
 * @property {Posicion[]} items - Lista de posiciones
 * @property {boolean} loading - Estado de carga
 * @property {string|null} error - Mensaje de error si existe
 */

/**
 * @typedef {Object} PosicionFilters
 * @property {string} searchText - Texto para búsqueda general
 * @property {number} [rack] - Filtro por número de rack
 * @property {number} [fila] - Filtro por número de fila
 * @property {number} [pasillo] - Filtro por número de pasillo
 */ 