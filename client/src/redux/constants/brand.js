/*
 * Public Actions
 */

// GET /api/brand
export const GET_BRANDS_REQUEST = "GET_BRANDS_REQUEST";
export const GET_BRANDS_SUCCESS = "GET_BRANDS_SUCCESS";
export const GET_BRANDS_FAIL = "GET_BRANDS_FAIL";

// GET /api/brand/:id
export const GET_BRAND_REQUEST = "GET_BRAND_REQUEST";
export const GET_BRAND_SUCCESS = "GET_BRAND_SUCCESS";
export const GET_BRAND_FAIL = "GET_BRAND_FAIL";

/*
 * Admin actions
 */

// POST /api/brand/add
export const ADD_BRAND_REQUEST = "ADD_BRAND_REQUEST";
export const ADD_BRAND_SUCCESS = "ADD_BRAND_SUCCESS";
export const ADD_BRAND_FAIL = "ADD_BRAND_FAIL";
export const ADD_BRAND_RESET = "ADD_BRAND_RESET";

// PUT /api/brand/edit/:id
export const EDIT_BRAND_REQUEST = "EDIT_BRAND_REQUEST";
export const EDIT_BRAND_SUCCESS = "EDIT_BRAND_SUCCESS";
export const EDIT_BRAND_FAIL = "EDIT_BRAND_FAIL";
export const EDIT_BRAND_RESET = "EDIT_BRAND_RESET";

// DEL /api/brand/remove/:id
export const REMOVE_BRAND_REQUEST = "REMOVE_BRAND_REQUEST";
export const REMOVE_BRAND_SUCCESS = "REMOVE_BRAND_SUCCESS";
export const REMOVE_BRAND_FAIL = "REMOVE_BRAND_FAIL";
export const REMOVE_BRAND_RESET = "REMOVE_BRAND_RESET";

// Clear errors
export const CLEAR_ERRORS = "CLEAR_ERRORS";
