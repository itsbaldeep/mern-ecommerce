// Dependencies
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Reducers
import { forgotPasswordReducer, profileReducer, userReducer, adminReducer } from "./reducers/user";
import { productsReducer } from "./reducers/product";
import { servicesReducer } from "./reducers/service";
import { directoryReducer } from "./reducers/directory";

// Combining reducers
const reducer = combineReducers({
  forgotPassword: forgotPasswordReducer,
  profile: profileReducer,
  user: userReducer,
  admin: adminReducer,
  product: productsReducer,
  service: servicesReducer,
  directory: directoryReducer,
});

// Creating the store
const middleware = [thunk];
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
