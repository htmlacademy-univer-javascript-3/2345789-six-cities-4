import FavoritesCity from '../../../../components/favorite/favorite-city';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { offers, fullOffer, comments } from '../../../mock-data';
import { createAPI } from '../../../../api/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { State } from '../../../../types/state';
import { AppThunkDispatch } from '../../../utils';
import { AuthorizationStatus } from '../../../../const';
import { MemoryRouter } from 'react-router-dom';

describe('Component: FavoritesCity', () => {
  const axios = createAPI();
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
      State,
      Action<string>,
      AppThunkDispatch
    >(middleware);

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

  it('should render correctly', () => {
    render(
      <Provider store={store} >
        <MemoryRouter initialEntries={['/']}>
          <FavoritesCity city={'Paris'} offers={offers} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Paris')).toBeInTheDocument();
  });
});
