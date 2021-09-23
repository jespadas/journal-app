import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { authReducer } from "../reducers/authReducer";
import { notesReducer } from "../reducers/notesReducer";
import { uiReducer } from "../reducers/uiReducer";

// Configuration to use Redux chrome extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Redux native function to combine all reducers
const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  notes: notesReducer,
});

// Creates the store with the reducers with thunk in order to
// Have a middleware who extends the store abilities and let 
// Write async logic that interacts with the store
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
