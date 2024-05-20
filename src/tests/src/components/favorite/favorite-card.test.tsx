import { render, screen } from '@testing-library/react';
import FavoriteCardsList from '../../../../components/favorite/favorite-card';
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

  it('should render correct', () => {
    render(
      <Provider store={ store } >
        <MemoryRouter initialEntries={['/']}>
          <FavoriteCardsList id={'aaa'} price={1337} rating={5} isFavorite={false} roomName={'backr00ms'} roomType={'luxury'} image={'img/image.png'} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('backr00ms')).toBeInTheDocument();
    expect(screen.getByText('luxury')).toBeInTheDocument();
    expect(screen.getByText('€1337')).toBeInTheDocument();
  });
});
