/**
 * @typedef Category
 * @property {integer} id
 * @property {string} description.required
 */

/**
 * @typedef CategoryRequest
 * @property {string} description.required
 */

/**
 * @typedef SuccessResponse
 * @property {integer} status
 * @property {string} message
 */

/**
 * @typedef Supplier
 * @property {integer} id
 * @property {string} name.required
 */

/**
 * @typedef SupplierRequest
 * @property {string} name.required
 */

/**
 * @typedef Product
 * @property {integer} id
 * @property {string} name
 * @property {Supplier.model} supplier
 * @property {Category.model} category
 * @property {integer} quantity_available
 * @property {string} created_at
 */

/**
 * @typedef ProductRequest
 * @property {string} name.required
 * @property {integer} quantity_available.required
 * @property {integer} categoryId.required
 * @property {integer} supplierId.required
 */

/**
 * @typedef ProductQuantityDTO
 * @property {integer} productId.required
 * @property {integer} quantity.required
 */

/**
 * @typedef ProductCheckStockRequest
 * @property {Array.<ProductQuantityDTO>} products.required
 */

/**
 * @typedef ProductSalesResponse
 * @property {integer} id
 * @property {string} name
 * @property {integer} quantity_available
 * @property {Supplier.model} supplier
 * @property {Category.model} category
 * @property {string} created_at
 * @property {Array.<string>} sales
 */
