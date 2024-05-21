import { createAPI } from '../../../../api/api';
import { AuthorizationStatus } from '../../../../const';
import { AppThunkDispatch } from '../../../utils';
import thunk from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { State } from '../../../../types/state';
import ReviewForm from '../../../../components/offer/review-form';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { offers, fullOffer, comments } from '../../../mock-data';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

describe('Component: ReviewForm', () => {
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
        <ReviewForm offerId={fullOffer.id} />
      </Provider>
    );

    expect(screen.getByLabelText('Your review')).toBeInTheDocument();
    expect(screen.getByTitle('perfect')).toBeInTheDocument();
    expect(screen.getByTitle('good')).toBeInTheDocument();
    expect(screen.getByTitle('not bad')).toBeInTheDocument();
    expect(screen.getByTitle('badly')).toBeInTheDocument();
    expect(screen.getByTitle('terribly')).toBeInTheDocument();
  });
});
