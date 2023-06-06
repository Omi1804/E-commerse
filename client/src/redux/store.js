import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartRedux';
import userReducer from './userRedux';

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });

const store = configureStore({
  reducer: rootReducer,
});

export { store };