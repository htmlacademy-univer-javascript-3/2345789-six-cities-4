import { describe, it, expect } from 'vitest';
import { updateOffers, updateCity, setOffersDataLoadingStatus, updateCurrentOffer, updateCurrentComments } from '../../../store/action';
import { Offer, FullOffer, Comment } from '../../../types/offers';
import offersReducer from '../../../store/offers-reducer';

describe('offersReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      city: 'Paris',
      offers: [],
      cityOffers: [],
      isOffersDataLoading: true,
      currentOffer: undefined,
      currentComments: [],
    };
    expect(offersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle updateCity', () => {
    const initialState = {
      city: 'Paris',
      offers: [
        { id: 1, city: { name: 'Paris' } },
        { id: 2, city: { name: 'London' } },
      ] as unknown as Offer[],
      cityOffers: [],
      isOffersDataLoading: true,
      currentOffer: undefined,
      currentComments: [],
    };
    const newCity = 'London';
    const action = updateCity(newCity);
    const expectedState = {
      city: newCity,
      offers: initialState.offers,
      cityOffers: [{ id: 2, city: { name: 'London' } }],
      isOffersDataLoading: true,
      currentOffer: undefined,
      currentComments: [],
    };
    expect(offersReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle updateOffers', () => {
    const initialState = {
      city: 'Paris',
      offers: [],
      cityOffers: [],
      isOffersDataLoading: true,
      currentOffer: undefined,
      currentComments: [],
    };
    const newOffers: Offer[] = [
      { id: 1, city: { name: 'Paris' } },
      { id: 2, city: { name: 'London' } },
    ] as unknown as Offer[];
    const action = updateOffers(newOffers);
    const expectedState = {
      city: 'Paris',
      offers: newOffers,
      cityOffers: [{ id: 1, city: { name: 'Paris' } }],
      isOffersDataLoading: true,
      currentOffer: undefined,
      currentComments: [],
    };
    expect(offersReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setOffersDataLoadingStatus', () => {
    const initialState = {
      city: 'Paris',
      offers: [],
      cityOffers: [],
      isOffersDataLoading: true,
      currentOffer: undefined,
      currentComments: [],
    };
    const newLoadingStatus = false;
    const action = setOffersDataLoadingStatus(newLoadingStatus);
    const expectedState = {
      city: 'Paris',
      offers: [],
      cityOffers: [],
      isOffersDataLoading: newLoadingStatus,
      currentOffer: undefined,
      currentComments: [],
    };
    expect(offersReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle updateCurrentOffer', () => {
    const initialState = {
      city: 'Paris',
      offers: [],
      cityOffers: [],
      isOffersDataLoading: true,
      currentOffer: undefined,
      currentComments: [],
    };
    const newCurrentOffer: FullOffer = { id: 1, title: 'Offer 1' } as unknown as FullOffer;
    const action = updateCurrentOffer(newCurrentOffer);
    const expectedState = {
      city: 'Paris',
      offers: [],
      cityOffers: [],
      isOffersDataLoading: true,
      currentOffer: newCurrentOffer,
      currentComments: [],
    };
    expect(offersReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle updateCurrentComments', () => {
    const initialState = {
      city: 'Paris',
      offers: [],
      cityOffers: [],
      isOffersDataLoading: true,
      currentOffer: undefined,
      currentComments: [],
    };
    const newCurrentComments: Comment[] = [
      { id: 1, comment: 'Comment 1' },
      { id: 2, comment: 'Comment 2' },
    ] as unknown as Comment[];
    const action = updateCurrentComments(newCurrentComments);
    const expectedState = {
      city: 'Paris',
      offers: [],
      cityOffers: [],
      isOffersDataLoading: true,
      currentOffer: undefined,
      currentComments: newCurrentComments,
    };
    expect(offersReducer(initialState, action)).toEqual(expectedState);
  });
});
