import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user-reducer';
import offersReducer from './offers-reducer';

export const reducer = combineReducers({
  user: userReducer,
  offers: offersReducer
});

