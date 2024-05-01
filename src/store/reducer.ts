import { createReducer } from '@reduxjs/toolkit';
import { updateOffers, updateCity, setOffersDataLoadingStatus, updateCurrentOffer, updateCurrentComments } from './action';
import { Offer, FullOffer, Comment } from '../types/offers';

type InitialState = {
  city: string;
  offers: Offer[];
  cityOffers: Offer[];
  isOffersDataLoading: boolean;
  currentOffer: FullOffer | undefined;
  currentComments: Comment[];
}

const initialState: InitialState = {
  city: 'Paris',
  offers: [],
  cityOffers: [],
  isOffersDataLoading: true,
  currentOffer: undefined,
  currentComments: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateCity, (state, action) => {
      state.city = action.payload;
      state.cityOffers = state.offers.filter((o) => o.city.name === state.city);
    })
    .addCase(updateOffers, (state, action) => {
      state.offers = action.payload;
      state.cityOffers = state.offers.filter((o) => o.city.name === state.city);
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(updateCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(updateCurrentComments, (state, action) => {
      state.currentComments = action.payload;
    });
});

export {reducer};
