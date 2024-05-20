import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginScreen from '../../../components/login';
import { createAPI } from '../../../api/api';
import thunk from 'redux-thunk';
import { offers } from '../../mock-data';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../../types/state';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch } from '../../utils';
import { MemoryRouter } from 'react-router-dom';

describe('Component: LoginScreen', () => {
  const axios = createAPI();
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const store = mockStoreCreator({
    offers: {
      city: 'Paris',
      cityOffers: offers
    },
    user: {
      authorizationStatus: AuthorizationStatus.Unknown
    },
    favorite: {
      favoritesCounter: 0
    }
  });

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <LoginScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';
    const expectedLoginValue = 'keks';
    const expectedPasswordValue = '123456';

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <LoginScreen />
        </MemoryRouter>
      </Provider>
    );
    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      expectedLoginValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue,
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
