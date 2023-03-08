/**
 * @typedef SalesProduct
 * @property {integer} productId.required
 * @property {integer} quantity.required
 */

/**
 * @typedef SalesRequest
 * @property {Array.<SalesProduct>} products.required
 */

/**
 * @typedef OrderCreated
 * @property {Array.<SalesProduct>} products
 * @property {User.model} user
 * @property {string} status
 * @property {string} transactionid
 * @property {string} serviceid
 * @property {string} _id
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string} __v
 */

/**
 * @typedef SalesCreateResponse
 * @property {integer} status
 * @property {OrderCreated.model} createdOrder
 */

/**
 * @typedef SalesFindResponse
 * @property {integer} status
 * @property {OrderCreated.model} order
 */

/**
 * @typedef SalesList
 * @property {integer} status
 * @property {Array.<OrderCreated>} orders
 */

/**
 * @typedef SalesProductResponse
 * @property {integer} status
 * @property {Array.<string>} salesIds
 */
