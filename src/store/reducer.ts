import { createReducer } from '@reduxjs/toolkit';
import { updateOffers, updateCity, setOffersDataLoadingStatus, updateCurrentOffer, updateCurrentComments, requireAuthorization,
  updateUserLogin, setUserDataLoadingStatus
} from './action';
import { Offer, FullOffer, Comment } from '../types/offers';
import { AuthorizationStatus } from '../const';

type InitialState = {
  city: string;
  offers: Offer[];
  cityOffers: Offer[];
  isOffersDataLoading: boolean;
  isUserDataLoading: boolean;
  currentOffer: FullOffer | undefined;
  currentComments: Comment[];
  authorizationStatus: AuthorizationStatus;
  userLogin: string | null;
}

const initialState: InitialState = {
  city: 'Paris',
  offers: [],
  cityOffers: [],
  isOffersDataLoading: true,
  isUserDataLoading: false,
  currentOffer: undefined,
  currentComments: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  userLogin: null
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
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(updateUserLogin, (state, action) => {
      state.userLogin = action.payload;
    })
    .addCase(setUserDataLoadingStatus, (state, action) => {
      state.isUserDataLoading = action.payload;
    });
});

export {reducer};
