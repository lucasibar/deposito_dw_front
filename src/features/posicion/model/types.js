/**
 * @typedef {Object} Proveedor
 * @property {string} id
 * @property {string} nombre
 * @property {string} categoria
 */

/**
 * @typedef {Object} Item
 * @property {string} id
 * @property {string} partida
 * @property {number} kilos
 * @property {number} unidades
 * @property {string} categoria
 * @property {string} descripcion
 * @property {Proveedor} proveedor
 */

/**
 * @typedef {Object} PosicionState
 * @property {Item[]} items
 * @property {boolean} loading
 * @property {string|null} error
 */

/**
 * @typedef {Object} MovimientoData
 * @property {string} [pasillo]
 * @property {string} [rack]
 * @property {string} [fila]
 * @property {string} [nivel]
 */

/**
 * @typedef {Object} DevolucionData
 * @property {Proveedor} proveedor
 * @property {string} tipoMovimiento
 * @property {Item} item
 * @property {number} kilos
 * @property {number} unidades
 * @property {string} partida
 * @property {string} posicion
 */ 