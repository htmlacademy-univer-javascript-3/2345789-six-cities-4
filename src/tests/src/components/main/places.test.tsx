import { render, screen } from '@testing-library/react';
import Places from '../../../../components/main/places';
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

describe('Component: Places', () => {
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
          <Places city='Paris' cityOffers={offers} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('1 places to stay in Paris')).toBeInTheDocument();
  });
});
