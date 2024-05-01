import { createReducer } from '@reduxjs/toolkit';
import { updateOffers, updateCity, setOffersDataLoadingStatus } from './action';
import { Offer } from '../types/offers';

type InitialState = {
  city: string;
  offers: Offer[];
  cityOffers: Offer[];
  isOffersDataLoading: boolean;
}

const initialState: InitialState = {
  city: 'Paris',
  offers: [],
  cityOffers: [],
  isOffersDataLoading: true
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
    });
});

export {reducer};
