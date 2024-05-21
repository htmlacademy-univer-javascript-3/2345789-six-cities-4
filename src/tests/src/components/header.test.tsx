import { createAPI } from '../../../api/api';
import { AuthorizationStatus } from '../../../const';
import { AppThunkDispatch } from '../../utils';
import thunk from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { State } from '../../../types/state';
import Header from '../../../components/header';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { offers, fullOffer, comments } from '../../mock-data';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

describe('Component: Header', () => {
  const axios = createAPI();
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);

  it('should render correctly', () => {
    const store = mockStoreCreator({
      offers: {
        city: 'Paris',
        cityOffers: offers,
        currentOffer: fullOffer,
        currentComments: comments,
      },
      user: {
        authorizationStatus: AuthorizationStatus.Unknown,
      },
      favorite: {
        favoritesCounter: 0,
      },
    });
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render correctly if logged in', () => {
    const store = mockStoreCreator({
      offers: {
        city: 'Paris',
        cityOffers: offers,
        currentOffer: fullOffer,
        currentComments: comments,
      },
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      favorite: {
        favoritesCounter: 0,
      },
    });
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});
