/**
 * @typedef {Object} Proveedor
 * @property {string} id
 * @property {string} nombre
 * @property {string} categoria
 */

/**
 * @typedef {Object} Item
 * @property {string} id
 * @property {string} categoria
 * @property {string} descripcion
 * @property {Proveedor} proveedor
 */

/**
 * @typedef {Object} RemitoState
 * @property {Proveedor[]} proveedores
 * @property {Item[]} items
 * @property {boolean} loading
 * @property {string|null} error
 */ 