/*
 * Public Actions
 */

// GET /api/category
export const GET_CATEGORIES_REQUEST = "GET_CATEGORIES_REQUEST";
export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
export const GET_CATEGORIES_FAIL = "GET_CATEGORIES_FAIL";

// GET /api/category/directory
export const GET_DIRECTORY_CATEGORIES_REQUEST = "GET_DIRECTORY_CATEGORIES_REQUEST";
export const GET_DIRECTORY_CATEGORIES_SUCCESS = "GET_DIRECTORY_CATEGORIES_SUCCESS";
export const GET_DIRECTORY_CATEGORIES_FAIL = "GET_DIRECTORY_CATEGORIES_FAIL";

// GET /api/category/product
export const GET_PRODUCT_CATEGORIES_REQUEST = "GET_PRODUCT_CATEGORIES_REQUEST";
export const GET_PRODUCT_CATEGORIES_SUCCESS = "GET_PRODUCT_CATEGORIES_SUCCESS";
export const GET_PRODUCT_CATEGORIES_FAIL = "GET_PRODUCT_CATEGORIES_FAIL";

// GET /api/category/service
export const GET_SERVICE_CATEGORIES_REQUEST = "GET_SERVICE_CATEGORIES_REQUEST";
export const GET_SERVICE_CATEGORIES_SUCCESS = "GET_SERVICE_CATEGORIES_SUCCESS";
export const GET_SERVICE_CATEGORIES_FAIL = "GET_SERVICE_CATEGORIES_FAIL";

// GET /api/category/:id
export const GET_CATEGORY_REQUEST = "GET_CATEGORY_REQUEST";
export const GET_CATEGORY_SUCCESS = "GET_CATEGORY_SUCCESS";
export const GET_CATEGORY_FAIL = "GET_CATEGORY_FAIL";

/*
 * Admin actions
 */

// POST /api/category/add
export const ADD_CATEGORY_REQUEST = "ADD_CATEGORY_REQUEST";
export const ADD_CATEGORY_SUCCESS = "ADD_CATEGORY_SUCCESS";
export const ADD_CATEGORY_FAIL = "ADD_CATEGORY_FAIL";
export const ADD_CATEGORY_RESET = "ADD_CATEGORY_RESET";

// PUT /api/category/edit/:id
export const EDIT_CATEGORY_REQUEST = "EDIT_CATEGORY_REQUEST";
export const EDIT_CATEGORY_SUCCESS = "EDIT_CATEGORY_SUCCESS";
export const EDIT_CATEGORY_FAIL = "EDIT_CATEGORY_FAIL";
export const EDIT_CATEGORY_RESET = "EDIT_CATEGORY_RESET";

// DEL /api/category/remove/:id
export const REMOVE_CATEGORY_REQUEST = "REMOVE_CATEGORY_REQUEST";
export const REMOVE_CATEGORY_SUCCESS = "REMOVE_CATEGORY_SUCCESS";
export const REMOVE_CATEGORY_FAIL = "REMOVE_CATEGORY_FAIL";
export const REMOVE_CATEGORY_RESET = "REMOVE_CATEGORY_RESET";

// Clear errors
export const CLEAR_ERRORS = "CLEAR_ERRORS";