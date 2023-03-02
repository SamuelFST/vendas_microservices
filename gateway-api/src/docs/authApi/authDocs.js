/**
 * Create a new user
 * @route POST /api/users
 * @group Auth API - User and Auth endpoints
 * @param {UserRegister.model} user.body.required
 * @param {string} transactionid.header.required
 * @returns {object} 200 - status and user created info
 * @returns {object} 400 - status and error message
 * @returns {Error}  500 - Unexpected error
 */

/**
 * Log-in a created user
 * @route POST /api/auth
 * @group Auth API
 * @param {Login.model} user.body.required
 * @param {string} transactionid.header.required
 * @returns {object} 200 - status and token
 * @returns {object} 404 - user not found
 * @returns {object} 401 - email and/or password not informed or doens't match
 * @returns {Error}  500 - Unexpected error
 */

/**
 * Find a created user by email (permission to see logged user data only)
 * @route GET /api/users/{email}
 * @group Auth API
 * @param {string} email.path.required
 * @param {string} transactionid.header.required
 * @returns {User.model} 200 - status and user
 * @returns {object} 400 - status and error message
 * @returns {object} 403 - dont have enough permission to see the data
 * @returns {object} 404 - user not found
 * @returns {Error}  500 - Unexpected error
 * @security JWT
 */
