import { createAPI } from '../../../../api/api';
import { AuthorizationStatus } from '../../../../const';
import { AppThunkDispatch } from '../../../utils';
import thunk from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { State } from '../../../../types/state';
import OfferScreen from '../../../../components/offer/offer';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { offers, fullOffer, comments } from '../../../mock-data';
import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

vi.mock('react-router-dom', () => ({
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  ...vi.importActual('react-router-dom'),
  useParams: vi.fn().mockReturnValue({ id: 'abc123' }),
}));

describe('Component: OfferScreen', () => {
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
      <Provider store={store}>
        <OfferScreen offers={offers} />
      </Provider>
    );

    expect(screen.getByText('Full House')).toBeInTheDocument();
    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByText('€1337.69')).toBeInTheDocument();
    expect(screen.getByText('very nice house')).toBeInTheDocument();
    expect(screen.getByText('good1')).toBeInTheDocument();
    expect(screen.getByText('good2')).toBeInTheDocument();
  });
});
