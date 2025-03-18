/**
 * @typedef {Object} Item
 * @property {string} categoria
 * @property {string} descripcion
 * @property {Object} proveedor
 * @property {string} proveedor.nombre
 */

/**
 * @typedef {Object} PartidaCuarentena
 * @property {string} id
 * @property {string} numeroPartida
 * @property {string} fecha
 * @property {number} kilos
 * @property {number} unidades
 * @property {string} estado
 * @property {Item} item
 */

/**
 * @typedef {Object} CuarentenaState
 * @property {PartidaCuarentena[]} partidas
 * @property {string|null} filterState
 * @property {string|null} filterText
 * @property {boolean} loading
 * @property {string|null} error
 */ 