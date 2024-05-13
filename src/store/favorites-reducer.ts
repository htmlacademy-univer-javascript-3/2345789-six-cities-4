import { createReducer } from '@reduxjs/toolkit';
import { setFavoritesDataLoadingStatus, updateFavorites, updateFavoritesCount } from './action';
import { Offer } from '../types/offers';

type InitialState = {
  isFavoriteDataLoading: boolean;
  favorites: Offer[];
  favoritesCounter: number;
}

const initialState: InitialState = {
  isFavoriteDataLoading: true,
  favorites: [],
  favoritesCounter: 0
};

const favoritesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setFavoritesDataLoadingStatus, (state, action) => {
      state.isFavoriteDataLoading = action.payload;
    })
    .addCase(updateFavorites, (state, action) => {
      state.favorites = action.payload;
      state.favoritesCounter = state.favorites.length;
    })
    .addCase(updateFavoritesCount, (state, action) => {
      state.favoritesCounter = action.payload;
    });
});

export default favoritesReducer;
