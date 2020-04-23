// See next.js + redux example for info about redux, server rendering etc:
// https://github.com/zeit/next.js/tree/master/examples/with-redux

import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";

import mainReducer from './modules/main';

// Combine reducers into their namespaces for access and organization
const rootReducer = combineReducers({
  main: mainReducer,
});

export function initializeStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools()
  );
  return store;
}

export default {
  initializeStore
};