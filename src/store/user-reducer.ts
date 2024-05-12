import { createReducer } from '@reduxjs/toolkit';
import { requireAuthorization, updateUserLogin, setUserDataLoadingStatus } from './action';
import { AuthorizationStatus } from '../const';

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  userLogin: string | null;
  isUserDataLoading: boolean;
}

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userLogin: null,
  isUserDataLoading: false
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(updateUserLogin, (state, action) => {
      state.userLogin = action.payload;
    })
    .addCase(setUserDataLoadingStatus, (state, action) => {
      state.isUserDataLoading = action.payload;
    });
});

export default userReducer;
