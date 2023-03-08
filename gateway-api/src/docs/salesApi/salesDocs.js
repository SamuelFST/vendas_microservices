/**
 * Find all created orders
 * @route GET /api/orders
 * @group Sales API - Sales endpoints
 * @param {string} transactionid.header.required
 * @returns {SalesList.model} 200 - status and array with all orders
 * @returns {object} 400 - transactionid not provided
 * @returns {object} 401 - not authenticated
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */

/**
 * Find a created order by ID
 * @route GET /api/orders/{id}
 * @group Sales API
 * @param {string} id.path.required
 * @param {string} transactionid.header.required
 * @returns {SalesFindResponse.model} 200 - status and order info
 * @returns {object} 400 - transactionid not provided
 * @returns {object} 401 - not authenticated
 * @returns {object} 404 - order not found
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */

/**
 * Find all created orders by product ID
 * @route GET /api/orders/products/{id}
 * @group Sales API
 * @param {string} id.path.required
 * @param {string} transactionid.header.required
 * @returns {SalesProductResponse.model} 200 - status and order info
 * @returns {object} 400 - transactionid not provided
 * @returns {object} 401 - not authenticated
 * @returns {object} 404 - no order found with the given product ID
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */

/**
 * Create a new order
 * @route POST /api/orders
 * @group Sales API
 * @param {SalesRequest.model} products.body.required
 * @param {string} transactionid.header.required
 * @returns {SalesCreateResponse.model} 200 - status and created order data
 * @returns {object} 400 - transactionid not provided, order products not informed, invalid product ID or product stock is out
 * @returns {object} 401 - not authenticated
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */
