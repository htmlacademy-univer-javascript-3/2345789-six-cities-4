import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import PrivateRoute from '../../components/private-route';
import { AuthorizationStatus } from '../../const';
import { State } from '../../types/state';
import { Action } from 'redux';
import { AppThunkDispatch } from '../utils';
import { createAPI } from '../../api/api';

describe('Component: PrivateRoute', () => {
  const axios = createAPI();
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  it('should render loading screen when user data is loading', () => {
    const store = mockStoreCreator({
      user: {
        isUserDataLoading: true,
        authorizationStatus: AuthorizationStatus.Unknown
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <span>Private Content</span>
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Loading ...')).toBeInTheDocument(); // Adjust this to whatever LoadingScreen renders
  });

  it('should render login when user is not authorized', () => {
    const store = mockStoreCreator({
      user: {
        isUserDataLoading: false,
        authorizationStatus: AuthorizationStatus.NoAuth
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <span>Private Content</span>
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<span>Login Page</span>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('should render private route when user is authorized', () => {
    const store = mockStoreCreator({
      user: {
        isUserDataLoading: false,
        authorizationStatus: AuthorizationStatus.Auth,
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <span>Private Content</span>
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Private Content')).toBeInTheDocument();
  });
});
