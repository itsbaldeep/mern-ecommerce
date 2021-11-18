// Dependencies
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Reducers
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userReducer,
} from "./reducers/user";

import { productsReducer } from "./reducers/product";

import { directoryReducer } from "./reducers/directory";

const reducer = combineReducers({
  allUsers: allUsersReducer,
  forgotPassword: forgotPasswordReducer,
  profile: profileReducer,
  user: userReducer,
  product: productsReducer,
  directory: directoryReducer,
});

// Creating the store
const middleware = [thunk];
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
