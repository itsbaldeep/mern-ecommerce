/*
 * Public Actions
 */

// GET /api/product
export const GET_PRODUCTS_REQUEST = "GET_PRODUCTS_REQUEST";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAIL = "GET_PRODUCTS_FAIL";

// GET /api/product/:id
export const GET_PRODUCT_REQUEST = "GET_PRODUCT_REQUEST";
export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS";
export const GET_PRODUCT_FAIL = "GET_PRODUCT_FAIL";

/*
 * Client Actions
 */

// POST /api/product/add
export const ADD_PRODUCT_REQUEST = "ADD_PRODUCT_REQUEST";
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
export const ADD_PRODUCT_FAIL = "ADD_PRODUCT_FAIL";

// PUT /api/product/edit/:id
export const EDIT_PRODUCT_REQUEST = "EDIT_PRODUCT_REQUEST";
export const EDIT_PRODUCT_SUCCESS = "EDIT_PRODUCT_SUCCESS";
export const EDIT_PRODUCT_FAIL = "EDIT_PRODUCT_FAIL";

// DEL /api/product/remove/:id
export const REMOVE_PRODUCT_REQUEST = "REMOVE_PRODUCT_REQUEST";
export const REMOVE_PRODUCT_SUCCESS = "REMOVE_PRODUCT_SUCCESS";
export const REMOVE_PRODUCT_FAIL = "REMOVE_PRODUCT_FAIL";

// Clear errors
export const CLEAR_ERRORS = "CLEAR_ERRORS";
