import { render, screen } from '@testing-library/react';
import FavoriteScreen from '../../../../components/favorite/favorites';
import { offers } from '../../../mock-data';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../../../api/api';
import { AuthorizationStatus } from '../../../../const';
import { AppThunkDispatch } from '../../../utils';
import thunk from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { State } from '../../../../types/state';
import { MemoryRouter } from 'react-router-dom';

describe('Component: FavoriteCardArticle', () => {
  const axios = createAPI();
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  it('should render correct', () => {
    const store = mockStoreCreator({
      offers: {
        city: 'Paris',
        cityOffers: offers
      },
      user: {
        authorizationStatus: AuthorizationStatus.Unknown
      },
      favorite: {
        favoritesCounter: 1,
        favorites: offers
      }});
    render(
      <Provider store={ store } >
        <MemoryRouter initialEntries={['/']}>
          <FavoriteScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Full House')).toBeInTheDocument();
    expect(screen.getByText('Pro Max')).toBeInTheDocument();
    expect(screen.getByText('€1337.69')).toBeInTheDocument();
  });

  it('should render empty favorites correct', () => {
    const store = mockStoreCreator({
      offers: {
        city: 'Paris',
        cityOffers: []
      },
      user: {
        authorizationStatus: AuthorizationStatus.Unknown
      },
      favorite: {
        favoritesCounter: 0,
        favorites: []
      }});
    render(
      <Provider store={ store } >
        <MemoryRouter initialEntries={['/']}>
          <FavoriteScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Nothing yet saved')).toBeInTheDocument();
  });
});
