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
 * @returns {Category.model} 200 - category info
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
 * @returns {Category.model} 200 - category created info
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
 * @returns {Category.model} 200 - updated category info
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
 * @returns {SuccessResponse.model} 200 - success response with status and ID of deleted category
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
 * @returns {Category.model} 200 - supplier info
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
 * @returns {Category.model} 200 - supplier created info
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
 * @returns {Category.model} 200 - updated supplier info
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
 * @returns {SuccessResponse.model} 200 - success response with status and ID of deleted supplier
 * @returns {object} 400 - transactionid not provided, ID not informed or supplier being used by a product
 * @returns {object} 401 - not authenticated
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */

// PRODUCT

/**
 * Find all created products and filter results by name
 * @route GET /api/products
 * @group Product API
 * @param {string} name.query
 * @param {string} transactionid.header.required
 * @returns {Array.<Product>} 200 - Array with the found products
 * @returns {object} 400 - transactionid not provided
 * @returns {object} 401 - not authenticated
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */

/**
 * Find a created product by ID
 * @route GET /api/products/{id}
 * @group Product API
 * @param {integer} id.path.required
 * @param {string} transactionid.header.required
 * @returns {Product.model} 200 - Product info
 * @returns {object} 400 - transactionid not provided or invalid ID
 * @returns {object} 401 - not authenticated
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */

/**
 * Create a new product
 * @route POST /api/products
 * @group Product API
 * @param {ProductRequest.model} product.body.required
 * @param {string} transactionid.header.required
 * @returns {Product.model} 200 - product created info
 * @returns {object} 400 - transactionid not provided, name, quantity_available, categoryId or supplierId not informed or category/supplier does not exist
 * @returns {object} 401 - not authenticated
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */

/**
 * Update a created product
 * @route PUT /api/products/{id}
 * @group Product API
 * @param {integer} id.path.required
 * @param {ProductRequest.model} product.body.required
 * @param {string} transactionid.header.required
 * @returns {Product.model} 200 - updated product info
 * @returns {object} 400 - transactionid not provided, ID, name, quantity_available, categoryId or supplierId not informed or category/supplier does not exist
 * @returns {object} 401 - not authenticated
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */

/**
 * Delete a created product
 * @route DELETE /api/products/{id}
 * @group Product API
 * @param {integer} id.path.required
 * @param {string} transactionid.header.required
 * @returns {SuccessResponse.model} 200 - success response with status and ID of deleted product
 * @returns {object} 400 - transactionid not provided, ID not informed or invalid ID
 * @returns {object} 401 - not authenticated
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */

/**
 * Verify the stock of a list of products
 * @route POST /api/products/stock
 * @group Product API
 * @param {ProductCheckStockRequest.model} products.body.required
 * @param {string} transactionid.header.required
 * @returns {SuccessResponse.model} 200 - success response with status and message
 * @returns {object} 400 - transactionid not provided, productId and/or quantity not informed, invalid ID or product stock is out
 * @returns {object} 401 - not authenticated
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */

/**
 * Find all sales of a product by product ID
 * @route GET /api/products/{id}/sales
 * @group Product API
 * @param {integer} id.path.required
 * @param {string} transactionid.header.required
 * @returns {ProductSalesResponse.model} 200 - product info with a list of sales of it
 * @returns {object} 400 - transactionid not provided, invalid ID or no sales found for the productId informed
 * @returns {object} 401 - not authenticated
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */

/**
 * Find all products by category ID
 * @route GET /api/products/category/{id}
 * @group Product API
 * @param {integer} id.path.required
 * @param {string} transactionid.header.required
 * @returns {Array.<Product>} 200 - Array with the found products with the category ID informed
 * @returns {object} 400 - transactionid not provided or invalid category ID
 * @returns {object} 401 - not authenticated
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */

/**
 * Find all products by supplier ID
 * @route GET /api/products/supplier/{id}
 * @group Product API
 * @param {integer} id.path.required
 * @param {string} transactionid.header.required
 * @returns {Array.<Product>} 200 - Array with the found products with the supplier ID informed
 * @returns {object} 400 - transactionid not provided or invalid supplier ID
 * @returns {object} 401 - not authenticated
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */
