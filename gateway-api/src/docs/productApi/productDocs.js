// CATEGORY

/**
 * Find all created categories and filter results by name
 * @route GET /api/categories
 * @group Product API - Category, Supplier and Products endpoints
 * @param {string} description.query
 * @param {string} transactionid.header.required
 * @returns {Array.<Category>} 200 - Array with the found categories
 * @returns {object} 400 - transactionid not provided
 * @returns {object} 401 - not authenticated
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */

/**
 * Find a created category by ID
 * @route GET /api/categories/{id}
 * @group Product API
 * @param {integer} id.path.required
 * @param {string} transactionid.header.required
 * @returns {Category} 200 - category info
 * @returns {object} 400 - transactionid not provided or invalid ID
 * @returns {object} 401 - not authenticated
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */

/**
 * Create a new category
 * @route POST /api/categories
 * @group Product API
 * @param {CategoryRequest.model} description.body.required
 * @param {string} transactionid.header.required
 * @returns {Category} 200 - category created info
 * @returns {object} 400 - transactionid not provided, description not informed or category already exists
 * @returns {object} 401 - not authenticated
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */

/**
 * Update a created category
 * @route PUT /api/categories/{id}
 * @group Product API
 * @param {integer} id.path.required
 * @param {CategoryRequest.model} description.body.required
 * @param {string} transactionid.header.required
 * @returns {Category} 200 - updated category info
 * @returns {object} 400 - transactionid not provided, ID or description not informed or category already exists
 * @returns {object} 401 - not authenticated
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */

/**
 * Delete a created category
 * @route DELETE /api/categories/{id}
 * @group Product API
 * @param {integer} id.path.required
 * @param {string} transactionid.header.required
 * @returns {SuccessResponse} 200 - success response with status and ID of deleted category
 * @returns {object} 400 - transactionid not provided, ID not informed or category being used by a product
 * @returns {object} 401 - not authenticated
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */

// SUPPLIER

/**
 * Find all created suppliers and filter results by name
 * @route GET /api/suppliers
 * @group Product API - Category, Supplier and Products endpoints
 * @param {string} name.query
 * @param {string} transactionid.header.required
 * @returns {Array.<Supplier>} 200 - Array with the found suppliers
 * @returns {object} 400 - transactionid not provided
 * @returns {object} 401 - not authenticated
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */

/**
 * Find a created supplier by ID
 * @route GET /api/suppliers/{id}
 * @group Product API
 * @param {integer} id.path.required
 * @param {string} transactionid.header.required
 * @returns {Category} 200 - supplier info
 * @returns {object} 400 - transactionid not provided or invalid ID
 * @returns {object} 401 - not authenticated
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */

/**
 * Create a new supplier
 * @route POST /api/suppliers
 * @group Product API
 * @param {SupplierRequest.model} name.body.required
 * @param {string} transactionid.header.required
 * @returns {Category} 200 - supplier created info
 * @returns {object} 400 - transactionid not provided, name not informed or supplier already exists
 * @returns {object} 401 - not authenticated
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */

/**
 * Update a created supplier
 * @route PUT /api/suppliers/{id}
 * @group Product API
 * @param {integer} id.path.required
 * @param {SupplierRequest.model} name.body.required
 * @param {string} transactionid.header.required
 * @returns {Category} 200 - updated supplier info
 * @returns {object} 400 - transactionid not provided, ID or name not informed or supplier already exists
 * @returns {object} 401 - not authenticated
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */

/**
 * Delete a created supplier
 * @route DELETE /api/suppliers/{id}
 * @group Product API
 * @param {integer} id.path.required
 * @param {string} transactionid.header.required
 * @returns {SuccessResponse} 200 - success response with status and ID of deleted supplier
 * @returns {object} 400 - transactionid not provided, ID not informed or supplier being used by a product
 * @returns {object} 401 - not authenticated
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */
