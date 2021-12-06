/*
 * Public Actions
 */

// GET /api/pet
export const GET_PETS_REQUEST = "GET_PETS_REQUEST";
export const GET_PETS_SUCCESS = "GET_PETS_SUCCESS";
export const GET_PETS_FAIL = "GET_PETS_FAIL";

// GET /api/pet/:id
export const GET_PET_REQUEST = "GET_PET_REQUEST";
export const GET_PET_SUCCESS = "GET_PET_SUCCESS";
export const GET_PET_FAIL = "GET_PET_FAIL";

/*
 * Admin actions
 */

// POST /api/pet/add
export const ADD_PET_REQUEST = "ADD_PET_REQUEST";
export const ADD_PET_SUCCESS = "ADD_PET_SUCCESS";
export const ADD_PET_FAIL = "ADD_PET_FAIL";
export const ADD_PET_RESET = "ADD_PET_RESET";

// PUT /api/pet/edit/:id
export const EDIT_PET_REQUEST = "EDIT_PET_REQUEST";
export const EDIT_PET_SUCCESS = "EDIT_PET_SUCCESS";
export const EDIT_PET_FAIL = "EDIT_PET_FAIL";
export const EDIT_PET_RESET = "EDIT_PET_RESET";

// DEL /api/pet/remove/:id
export const REMOVE_PET_REQUEST = "REMOVE_PET_REQUEST";
export const REMOVE_PET_SUCCESS = "REMOVE_PET_SUCCESS";
export const REMOVE_PET_FAIL = "REMOVE_PET_FAIL";
export const REMOVE_PET_RESET = "REMOVE_PET_RESET";

// Clear errors
export const CLEAR_ERRORS = "CLEAR_ERRORS";
