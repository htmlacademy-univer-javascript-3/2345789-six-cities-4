import { describe, it, expect } from 'vitest';
import { requireAuthorization, updateUserLogin, setUserDataLoadingStatus } from '../../../store/action';
import { AuthorizationStatus } from '../../../const';
import userReducer from '../../../store/user-reducer';

describe('userReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userLogin: null,
      isUserDataLoading: false,
    };
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle requireAuthorization', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userLogin: null,
      isUserDataLoading: false,
    };
    const newAuthorizationStatus = AuthorizationStatus.Auth;
    const action = requireAuthorization(newAuthorizationStatus);
    const expectedState = {
      authorizationStatus: newAuthorizationStatus,
      userLogin: null,
      isUserDataLoading: false,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle updateUserLogin', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userLogin: null,
      isUserDataLoading: false,
    };
    const newUserLogin = 'gleb_kletskov_1337';
    const action = updateUserLogin(newUserLogin);
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userLogin: newUserLogin,
      isUserDataLoading: false,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setUserDataLoadingStatus', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userLogin: null,
      isUserDataLoading: false,
    };
    const newLoadingStatus = true;
    const action = setUserDataLoadingStatus(newLoadingStatus);
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userLogin: null,
      isUserDataLoading: newLoadingStatus,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
});
