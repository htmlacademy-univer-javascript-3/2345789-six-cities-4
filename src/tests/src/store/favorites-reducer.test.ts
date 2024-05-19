import { describe, it, expect } from 'vitest';
import { setFavoritesDataLoadingStatus, updateFavorites, updateFavoritesCount } from '../../../store/action';
import { Offer } from '../../../types/offers';
import favoritesReducer from '../../../store/favorites-reducer';

describe('favoritesReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      isFavoriteDataLoading: true,
      favorites: [],
      favoritesCounter: 0,
    };
    expect(favoritesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setFavoritesDataLoadingStatus', () => {
    const initialState = {
      isFavoriteDataLoading: true,
      favorites: [],
      favoritesCounter: 0,
    };
    const newLoadingStatus = false;
    const action = setFavoritesDataLoadingStatus(newLoadingStatus);
    const expectedState = {
      isFavoriteDataLoading: newLoadingStatus,
      favorites: [],
      favoritesCounter: 0,
    };
    expect(favoritesReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle updateFavorites', () => {
    const initialState = {
      isFavoriteDataLoading: true,
      favorites: [],
      favoritesCounter: 0,
    };
    const newFavorites: Offer[] = [
      { id: 1, title: 'Offer 1' },
      { id: 2, title: 'Offer 2' },
    ] as unknown as Offer[];
    const action = updateFavorites(newFavorites);
    const expectedState = {
      isFavoriteDataLoading: true,
      favorites: newFavorites,
      favoritesCounter: newFavorites.length,
    };
    expect(favoritesReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle updateFavoritesCount', () => {
    const initialState = {
      isFavoriteDataLoading: true,
      favorites: [],
      favoritesCounter: 0,
    };
    const newFavoritesCount = 5;
    const action = updateFavoritesCount(newFavoritesCount);
    const expectedState = {
      isFavoriteDataLoading: true,
      favorites: [],
      favoritesCounter: newFavoritesCount,
    };
    expect(favoritesReducer(initialState, action)).toEqual(expectedState);
  });
});
