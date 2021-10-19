// Dependencies
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Reducers
import {
  allUsersReducer,
  detailsReducer,
  forgotPasswordReducer,
  profileReducer,
  userReducer,
} from "./reducers/user";

const reducer = combineReducers({
  allUsers: allUsersReducer,
  userDetails: detailsReducer,
  forgotPassword: forgotPasswordReducer,
  profile: profileReducer,
  user: userReducer,
});

// Creating the store
const middleware = [thunk];
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
