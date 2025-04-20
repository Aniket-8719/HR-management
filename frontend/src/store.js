import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk"; 
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./reducers/userReducers";

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
});

// Initial state
let initialState = {}; // You can add default values here if needed

// Middleware
// const middleware = [thunk];

// Create store
const store = createStore(
  rootReducer,
  initialState,
  
  (import.meta.env.MODE === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__)
    ? composeWithDevTools(applyMiddleware(thunk)) // If DevTools is available
    : applyMiddleware(thunk) // Fallback for environments without DevTools
); 

export default store;
