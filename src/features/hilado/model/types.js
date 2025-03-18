/**
 * @typedef {Object} Proveedor
 * @property {number} id - ID del proveedor
 * @property {string} nombre - Nombre del proveedor
 */

/**
 * @typedef {Object} Hilado
 * @property {number} id - ID único del hilado
 * @property {string} categoria - Categoría del hilado (ej: "ALGODON", "POLIESTER")
 * @property {string} descripcion - Descripción detallada
 * @property {number} partida - Número de partida
 * @property {string} partidaEstado - Estado de la partida
 * @property {number} kilos - Cantidad en kilos
 * @property {number} unidades - Cantidad de unidades
 * @property {Proveedor} proveedor - Datos del proveedor
 * @property {Date} fechaCreacion - Fecha de creación
 * @property {Date} [fechaModificacion] - Fecha de última modificación
 */

/**
 * @typedef {Object} HiladoState
 * @property {Hilado[]} items - Lista de hilados
 * @property {boolean} loading - Estado de carga
 * @property {string|null} error - Mensaje de error si existe
 * @property {Object} filters - Filtros aplicados
 * @property {string} filters.searchText - Texto de búsqueda
 * @property {string} filters.rack - Filtro por rack
 * @property {string} filters.fila - Filtro por fila
 * @property {string} filters.pasillo - Filtro por pasillo
 */ 