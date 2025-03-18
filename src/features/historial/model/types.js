/**
 * @typedef {Object} HistorialItem
 * @property {string} proveedor
 * @property {string} categoria
 * @property {string} descripcion
 * @property {string|number} partida
 * @property {number} kilos
 * @property {number} unidades
 */

/**
 * @typedef {Object} RemitoSalida
 * @property {string} fecha
 * @property {string} proveedor
 * @property {string} numeroRemito
 * @property {HistorialItem[]} items
 */

/**
 * @typedef {Object} HistorialState
 * @property {RemitoSalida[]} movimientos
 * @property {boolean} loading
 * @property {string|null} error
 */ 